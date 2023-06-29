import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSubjectAddDialogController } from "./SubjectAddDialog.controller";
import { SubjectForm } from "@presentation/components/forms/Subject/SubjectForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";
import React from "react";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const SubjectAddDialog = () => {
    const { open, close, isOpen } = useSubjectAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button
            variant="contained"
            className="add-button"
            onClick={open}
            style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
        >
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