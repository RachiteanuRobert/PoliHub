import { FormActions } from "@infrastructure/utils/formUtils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { LaboratoryInstanceForm } from "@presentation/components/forms/LaboratoryInstance/LaboratoryInstanceForm";
import { useIntl } from "react-intl";

export const LaboratoryInstanceUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateLaboratoryInstance" })}
            </DialogTitle>
            <DialogContent>
                <LaboratoryInstanceForm
                    onSubmit={close}
                    action={FormActions.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};