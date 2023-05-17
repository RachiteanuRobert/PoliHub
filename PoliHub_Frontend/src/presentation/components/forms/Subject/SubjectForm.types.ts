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
    professor: string;
    department: string;
<<<<<<< HEAD
<<<<<<< HEAD
    creditsNo: string;
<<<<<<< HEAD
    description: string;
=======
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
    creditsno: string;
    description: string
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
=======
    description: string
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
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