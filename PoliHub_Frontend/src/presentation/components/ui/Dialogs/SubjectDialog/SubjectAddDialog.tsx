import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSubjectAddDialogController } from "./SubjectAddDialog.controller";
import { SubjectForm } from "@presentation/components/forms/Subject/SubjectForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const SubjectAddDialog = () => {
    const { open, close, isOpen } = useSubjectAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addSubject" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addSubject" })}
            </DialogTitle>
            <DialogContent>
                <SubjectForm
                    onSubmit={close}
                    action={FormActions.ADD}
                />
            </DialogContent>
        </Dialog>
    </div>
};