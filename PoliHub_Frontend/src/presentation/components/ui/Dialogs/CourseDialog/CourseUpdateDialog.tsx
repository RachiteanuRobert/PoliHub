import { FormActions } from "@infrastructure/utils/formUtils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CourseForm } from "@presentation/components/forms/Course/CourseForm";
import { useIntl } from "react-intl";

export const CourseUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateCourse" })}
            </DialogTitle>
            <DialogContent>
                <CourseForm
                    onSubmit={close}
                    action={FormActions.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};