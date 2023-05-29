import { FormActions } from "@infrastructure/utils/formUtils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CourseInstanceForm } from "@presentation/components/forms/CourseInstance/CourseInstanceForm";
import { useIntl } from "react-intl";

export const CourseInstanceUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateCourseInstance" })}
            </DialogTitle>
            <DialogContent>
                <CourseInstanceForm
                    onSubmit={close}
                    action={FormActions.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};