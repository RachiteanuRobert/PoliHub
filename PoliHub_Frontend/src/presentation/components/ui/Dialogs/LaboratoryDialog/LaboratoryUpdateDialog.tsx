import { FormActions } from "@infrastructure/utils/formUtils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { LaboratoryForm } from "@presentation/components/forms/Laboratory/LaboratoryForm";
import { useIntl } from "react-intl";

export const LaboratoryUpdateDialog = ({ isOpen, setIsOpen }: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { formatMessage } = useIntl();
    const close = () => setIsOpen(false);

    return <div>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.updateLaboratory" })}
            </DialogTitle>
            <DialogContent>
                <LaboratoryForm
                    onSubmit={close}
                    action={FormActions.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};