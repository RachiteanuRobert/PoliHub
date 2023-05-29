import { CourseInstanceFormController, CourseInstanceFormModel } from "./CourseInstanceForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import lodash, { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCourseInstanceApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { useAppSelector } from "@application/store";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: CourseInstanceFormModel) => {
    const defaultValues = {
        name: "",
        description: "",
        courseInstanceDate: new Date(),
        courseId: ""
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

const useInitCourseInstanceAddForm = () => {
    const defaultValues = getDefaultValues();

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const useInitCourseInstanceUpdateForm = () => {
    const { courseInstanceToUpdate } = useAppSelector(x => x.courseInstanceReducer);
    console.log(courseInstanceToUpdate);

    const defaultValues = getDefaultValues(courseInstanceToUpdate);

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}
const getSchema = (defaultValues: CourseInstanceFormModel) => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        id: yup.string()
            .optional(),
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.courseInstanceName",
                    }),
                }))
            .default(defaultValues.name),
        courseInstanceDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.courseInstanceDate",
                    }),
                }))
            .default(defaultValues.courseInstanceDate),
        courseId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.courseId",
                    }),
                }))
            .default(defaultValues.courseId),
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
const useInitCourseInstanceForm = (action: FormActions) => {
    if (lodash.isEqual(action, FormActions.ADD)) {
        const { defaultValues, resolver } = useInitCourseInstanceAddForm();
        return { defaultValues, resolver };
    }

    const { defaultValues, resolver } = useInitCourseInstanceUpdateForm();
    return { defaultValues, resolver };
}
export const useCourseInstanceFormController = (action: FormActions, onSubmit?: () => void): CourseInstanceFormController => {
    const { defaultValues, resolver } = useInitCourseInstanceForm(action);
    const {
        addCourseInstance: {
            mutation: addMutation,
            key: addMutationKey
        },
        getCourseInstances: { key: queryKey },
        updateCourseInstance: {
            mutation: updateMutation,
            key: updateMutationKey
        }
    } = useCourseInstanceApi();
    const mutationKey = lodash.isEqual(action, FormActions.ADD) ? addMutationKey : updateMutationKey;
    const mutation = lodash.isEqual(action, FormActions.ADD) ? addMutation : updateMutation;
    const { mutateAsync: mutate, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: CourseInstanceFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<CourseInstanceFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectDate = useCallback((value: unknown) => {
        console.log(value);
        setValue("courseInstanceDate", value as Date, {
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