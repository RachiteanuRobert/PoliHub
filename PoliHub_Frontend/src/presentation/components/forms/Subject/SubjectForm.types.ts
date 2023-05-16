import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type SubjectFormModel = {
    id?: string,
    name: string;
    year: string;
    semester: string;
    department: string;
    creditsNo: string;
    description: string
};

export type SubjectFormState = {
    errors: FieldErrorsImpl<DeepRequired<SubjectFormModel>>;
};

export type SubjectFormActions = {
    register: UseFormRegister<SubjectFormModel>;
    watch: UseFormWatch<SubjectFormModel>;
    handleSubmit: UseFormHandleSubmit<SubjectFormModel>;
    submit: (body: SubjectFormModel) => void;
};
export type SubjectFormComputed = {
    defaultValues: SubjectFormModel,
    isSubmitting: boolean
};

export type SubjectFormController = FormController<SubjectFormState, SubjectFormActions, SubjectFormComputed>;