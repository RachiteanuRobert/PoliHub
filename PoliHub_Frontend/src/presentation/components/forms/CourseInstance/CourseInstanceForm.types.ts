import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type CourseInstanceFormModel = {
    id?: string,
    courseInstanceDate: Date;
    name: string;
    description: string;
    courseId: string;
};

export type CourseInstanceFormState = {
    errors: FieldErrorsImpl<DeepRequired<CourseInstanceFormModel>>;
};

export type CourseInstanceFormActions = {
    register: UseFormRegister<CourseInstanceFormModel>;
    watch: UseFormWatch<CourseInstanceFormModel>;
    handleSubmit: UseFormHandleSubmit<CourseInstanceFormModel>;
    submit: (body: CourseInstanceFormModel) => void;
    selectDate: (value: unknown) => void;
};
export type CourseInstanceFormComputed = {
    defaultValues: CourseInstanceFormModel,
    isSubmitting: boolean
};

export type CourseInstanceFormController = FormController<CourseInstanceFormState, CourseInstanceFormActions, CourseInstanceFormComputed>;