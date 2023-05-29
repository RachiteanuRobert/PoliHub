import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLaboratoryInstanceAddDialogController } from "./LaboratoryInstanceAddDialog.controller";
import { LaboratoryInstanceForm } from "@presentation/components/forms/LaboratoryInstance/LaboratoryInstanceForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const LaboratoryInstanceAddDialog = () => {
    const { open, close, isOpen } = useLaboratoryInstanceAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addLaboratoryInstance" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addLaboratoryInstance" })}
            </DialogTitle>
            <DialogContent>
                <LaboratoryInstanceForm
                    onSubmit={close}
                    action={FormActions.ADD}
                />
            </DialogContent>
        </Dialog>
    </div>
};