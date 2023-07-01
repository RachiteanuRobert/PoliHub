import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCourseInstanceAddDialogController } from "./CourseInstanceAddDialog.controller";
import { CourseInstanceForm } from "@presentation/components/forms/CourseInstance/CourseInstanceForm";
import { useIntl } from "react-intl";
import { FormActions } from "@infrastructure/utils/formUtils";

/**
 * This component wraps the user add form into a modal dialog.
 */

interface CourseInstanceAddDialogProps {
    courseId: string;
    onAddButtonPress: () => void;
}

export const CourseInstanceAddDialog = ({
    courseId,
    onAddButtonPress,}: CourseInstanceAddDialogProps) => {
    const { open, close, isOpen } = useCourseInstanceAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button
            variant="contained"
            onClick={open}
            style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
        >
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
                    propCourseId={courseId}
                />
            </DialogContent>
        </Dialog>
    </div>
};