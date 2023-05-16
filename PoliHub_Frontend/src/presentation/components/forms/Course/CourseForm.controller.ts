import { CourseFormController, CourseFormModel } from "./CourseForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import lodash, { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCourseApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { useAppSelector } from "@application/store";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: CourseFormModel) => {
    const defaultValues = {
        professorName: "",
        startTime: "",
        duration: 0,
        location: "",
        series: "",
        dayOfWeek: 0,
        subjectId: ""
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

const useInitCourseAddForm = () => {
    const defaultValues = getDefaultValues();

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const useInitCourseUpdateForm = () => {
    const { courseToUpdate } = useAppSelector(x => x.courseReducer);
    console.log(courseToUpdate);

    const defaultValues = getDefaultValues(courseToUpdate);

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}
const getSchema = (defaultValues: CourseFormModel) => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        id: yup.string()
            .optional(),
        professorName: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.professorName",
                    }),
                }))
            .default(defaultValues.professorName),
        startTime: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.startTime",
                    }),
                }))
            .default(defaultValues.startTime),
        duration: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.duration",
                    }),
                }))
            .default(defaultValues.duration),
        location: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.location",
                    }),
                }))
            .default(defaultValues.location),
        series: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.series",
                    }),
                }))
            .default(defaultValues.series),
        dayOfWeek: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.dayOfWeek",
                    }),
                }))
            .default(defaultValues.dayOfWeek),
        subjectId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.subjectId",
                    }),
                }))
            .default(defaultValues.subjectId),
    });

    return schema;
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
const useInitCourseForm = (action: FormActions) => {
    if (lodash.isEqual(action, FormActions.ADD)) {
        const { defaultValues, resolver } = useInitCourseAddForm();
        return { defaultValues, resolver };
    }

    const { defaultValues, resolver } = useInitCourseUpdateForm();
    return { defaultValues, resolver };
}
export const useCourseFormController = (action: FormActions, onSubmit?: () => void): CourseFormController => {
    const { defaultValues, resolver } = useInitCourseForm(action);
    const {
        addCourse: {
            mutation: addMutation,
            key: addMutationKey
        },
        getCourses: { key: queryKey },
        updateCourse: {
            mutation: updateMutation,
            key: updateMutationKey
        }
    } = useCourseApi();
    const mutationKey = lodash.isEqual(action, FormActions.ADD) ? addMutationKey : updateMutationKey;
    const mutation = lodash.isEqual(action, FormActions.ADD) ? addMutation : updateMutation;
    const { mutateAsync: mutate, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: CourseFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<CourseFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
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