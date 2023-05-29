import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type LaboratoryInstanceFormModel = {
    id?: string,
    laboratoryInstanceDate: Date;
    name: string;
    description: string;
    laboratoryId: string;
};

export type LaboratoryInstanceFormState = {
    errors: FieldErrorsImpl<DeepRequired<LaboratoryInstanceFormModel>>;
};

export type LaboratoryInstanceFormActions = {
    register: UseFormRegister<LaboratoryInstanceFormModel>;
    watch: UseFormWatch<LaboratoryInstanceFormModel>;
    handleSubmit: UseFormHandleSubmit<LaboratoryInstanceFormModel>;
    submit: (body: LaboratoryInstanceFormModel) => void;
    selectDate: (value: unknown) => void;
};
export type LaboratoryInstanceFormComputed = {
    defaultValues: LaboratoryInstanceFormModel,
    isSubmitting: boolean
};

export type LaboratoryInstanceFormController = FormController<LaboratoryInstanceFormState, LaboratoryInstanceFormActions, LaboratoryInstanceFormComputed>;