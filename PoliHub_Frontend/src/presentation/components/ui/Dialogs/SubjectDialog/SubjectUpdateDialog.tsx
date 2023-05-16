import { FormActions } from "@infrastructure/utils/formUtils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { SubjectForm } from "@presentation/components/forms/Subject/SubjectForm";
import { useIntl } from "react-intl";

export const SubjectUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateSubject" })}
            </DialogTitle>
            <DialogContent>
                <SubjectForm
                    onSubmit={close}
                    action={FormActions.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};