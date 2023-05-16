import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCourseAddDialogController } from "./CourseAddDialog.controller";
import { CourseForm } from "@presentation/components/forms/Course/CourseForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const CourseAddDialog = () => {
    const { open, close, isOpen } = useCourseAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addCourse" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addCourse" })}
            </DialogTitle>
            <DialogContent>
                <CourseForm
                    onSubmit={close}
                    action={FormActions.ADD}
                />
            </DialogContent>
        </Dialog>
    </div>
};