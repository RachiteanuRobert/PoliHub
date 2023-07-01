import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLaboratoryInstanceAddDialogController } from "./LaboratoryInstanceAddDialog.controller";
import { LaboratoryInstanceForm } from "@presentation/components/forms/LaboratoryInstance/LaboratoryInstanceForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
interface LaboratoryInstanceAddDialogProps {
    laboratoryId: string;
    onAddButtonPress: () => void;
}
export const LaboratoryInstanceAddDialog = ({
    laboratoryId,
    onAddButtonPress,}: LaboratoryInstanceAddDialogProps) => {
    const { open, close, isOpen } = useLaboratoryInstanceAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button
            variant="contained"
            onClick={open}
            style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
        >
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
                    propLaboratoryId={laboratoryId}
                />
            </DialogContent>
        </Dialog>
    </div>
};