import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type LaboratoryFormModel = {
    id?: string,
    assistantName: string;
    startTime: string;
    duration: number;
    location: string;
    dayOfWeek: number;
    courseId: string;
};

export type LaboratoryFormState = {
    errors: FieldErrorsImpl<DeepRequired<LaboratoryFormModel>>;
};

export type LaboratoryFormActions = {
    register: UseFormRegister<LaboratoryFormModel>;
    watch: UseFormWatch<LaboratoryFormModel>;
    handleSubmit: UseFormHandleSubmit<LaboratoryFormModel>;
    submit: (body: LaboratoryFormModel) => void;
};
export type LaboratoryFormComputed = {
    defaultValues: LaboratoryFormModel,
    isSubmitting: boolean
};

export type LaboratoryFormController = FormController<LaboratoryFormState, LaboratoryFormActions, LaboratoryFormComputed>;