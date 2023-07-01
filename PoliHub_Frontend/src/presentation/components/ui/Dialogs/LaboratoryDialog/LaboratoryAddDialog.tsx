import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLaboratoryAddDialogController } from "./LaboratoryAddDialog.controller";
import { LaboratoryForm } from "@presentation/components/forms/Laboratory/LaboratoryForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
interface LaboratoryAddDialogProps {
    courseId: string;
    onAddButtonPress: () => void;
}
export const LaboratoryAddDialog = ({
    courseId,
    onAddButtonPress,}: LaboratoryAddDialogProps) => {
    const { open, close, isOpen } = useLaboratoryAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button
            variant="contained"
            onClick={open}
            style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
        >
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
                    propCourseId={courseId}
                />
            </DialogContent>
        </Dialog>
    </div>
};