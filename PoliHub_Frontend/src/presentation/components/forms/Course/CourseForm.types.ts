import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type CourseFormModel = {
    id?: string,
    professorName: string;
    startTime: string;
    duration: number;
    location: string;
    series: string;
    dayOfWeek: number;
    subjectId: string;
};

export type CourseFormState = {
    errors: FieldErrorsImpl<DeepRequired<CourseFormModel>>;
};

export type CourseFormActions = {
    register: UseFormRegister<CourseFormModel>;
    watch: UseFormWatch<CourseFormModel>;
    handleSubmit: UseFormHandleSubmit<CourseFormModel>;
    submit: (body: CourseFormModel) => void;
};
export type CourseFormComputed = {
    defaultValues: CourseFormModel,
    isSubmitting: boolean
};

export type CourseFormController = FormController<CourseFormState, CourseFormActions, CourseFormComputed>;