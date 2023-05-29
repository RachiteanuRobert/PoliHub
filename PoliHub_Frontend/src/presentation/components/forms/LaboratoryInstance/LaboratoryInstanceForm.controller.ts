import { LaboratoryInstanceFormController, LaboratoryInstanceFormModel } from "./LaboratoryInstanceForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import lodash, { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLaboratoryInstanceApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { useAppSelector } from "@application/store";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: LaboratoryInstanceFormModel) => {
    const defaultValues = {
        name: "",
        description: "",
        laboratoryInstanceDate: new Date(),
        laboratoryId: ""
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */

const useInitLaboratoryInstanceAddForm = () => {
    const defaultValues = getDefaultValues();

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const useInitLaboratoryInstanceUpdateForm = () => {
    const { laboratoryInstanceToUpdate } = useAppSelector(x => x.laboratoryInstanceReducer);
    console.log(laboratoryInstanceToUpdate);

    const defaultValues = getDefaultValues(laboratoryInstanceToUpdate);

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}
const getSchema = (defaultValues: LaboratoryInstanceFormModel) => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        id: yup.string()
            .optional(),
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.laboratoryInstanceName",
                    }),
                }))
            .default(defaultValues.name),
        laboratoryInstanceDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.laboratoryInstanceDate",
                    }),
                }))
            .default(defaultValues.laboratoryInstanceDate),
        laboratoryId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.laboratoryId",
                    }),
                }))
            .default(defaultValues.laboratoryId),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description),
    });

    return schema;
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
const useInitLaboratoryInstanceForm = (action: FormActions) => {
    if (lodash.isEqual(action, FormActions.ADD)) {
        const { defaultValues, resolver } = useInitLaboratoryInstanceAddForm();
        return { defaultValues, resolver };
    }

    const { defaultValues, resolver } = useInitLaboratoryInstanceUpdateForm();
    return { defaultValues, resolver };
}
export const useLaboratoryInstanceFormController = (action: FormActions, onSubmit?: () => void): LaboratoryInstanceFormController => {
    const { defaultValues, resolver } = useInitLaboratoryInstanceForm(action);
    const {
        addLaboratoryInstance: {
            mutation: addMutation,
            key: addMutationKey
        },
        getLaboratoryInstances: { key: queryKey },
        updateLaboratoryInstance: {
            mutation: updateMutation,
            key: updateMutationKey
        }
    } = useLaboratoryInstanceApi();
    const mutationKey = lodash.isEqual(action, FormActions.ADD) ? addMutationKey : updateMutationKey;
    const mutation = lodash.isEqual(action, FormActions.ADD) ? addMutation : updateMutation;
    const { mutateAsync: mutate, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: LaboratoryInstanceFormModel) => // Create a submit callback to send the form data to the backend.
        mutate(data).then(() => {
            queryClient.invalidateQueries([queryKey]); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [mutate, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<LaboratoryInstanceFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectDate = useCallback((value: unknown) => {
        console.log(value);
        setValue("laboratoryInstanceDate", value as Date, {
            shouldValidate: true,
        })
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch,
            // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectDate,
        },
        computed: {
            defaultValues,
            isSubmitting: status === "loading" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}