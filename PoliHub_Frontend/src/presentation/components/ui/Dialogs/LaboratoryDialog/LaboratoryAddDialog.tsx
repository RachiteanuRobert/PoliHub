import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLaboratoryAddDialogController } from "./LaboratoryAddDialog.controller";
import { LaboratoryForm } from "@presentation/components/forms/Laboratory/LaboratoryForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const LaboratoryAddDialog = () => {
    const { open, close, isOpen } = useLaboratoryAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addLaboratory" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addLaboratory" })}
            </DialogTitle>
            <DialogContent>
                <LaboratoryForm
                    onSubmit={close}
                    action={FormActions.ADD}
                />
            </DialogContent>
        </Dialog>
    </div>
};