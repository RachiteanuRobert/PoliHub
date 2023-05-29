import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCourseInstanceAddDialogController } from "./CourseInstanceAddDialog.controller";
import { CourseInstanceForm } from "@presentation/components/forms/CourseInstance/CourseInstanceForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const CourseInstanceAddDialog = () => {
    const { open, close, isOpen } = useCourseInstanceAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addCourseInstance" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addCourseInstance" })}
            </DialogTitle>
            <DialogContent>
                <CourseInstanceForm
                    onSubmit={close}
                    action={FormActions.ADD}
                />
            </DialogContent>
        </Dialog>
    </div>
};