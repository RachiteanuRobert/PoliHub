import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Select,
    MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useCourseInstanceFormController } from "./CourseInstanceForm.controller";
import { isEmpty, isUndefined } from "lodash"
import { DatePicker, LocalizationProvider, deDE } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {FormActions} from "@infrastructure/utils/formUtils";

/**
 * Here we declare the CourseInstance add and update form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const CourseInstanceForm = (props: {
    onSubmit?: () => void;
    action: FormActions;
    propCourseId: string;
}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useCourseInstanceFormController(props.action, props.onSubmit); // Use the controller.
    const courseId = props.propCourseId !== "" ? props.propCourseId : "";

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <Grid container item direction="row" xs={12} columnSpacing={4}>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.name)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.name" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("name")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.name",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.name)}
                        >
                            {state.errors.name?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.courseInstanceDate)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.courseInstanceDate" />
                        </FormLabel>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                        >
                            <DatePicker
                                {...actions.register("courseInstanceDate")}
                                defaultValue={actions.watch("courseInstanceDate")}
                                onChange={actions.selectDate}
                            />
                        </LocalizationProvider>
                        <FormHelperText
                            hidden={isUndefined(state.errors.courseInstanceDate)}
                        >
                            {state.errors.courseInstanceDate?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl fullWidth error={!isUndefined(state.errors.courseId)}>
                        <FormLabel required>
                            <FormattedMessage id="globals.courseId" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("courseId")}
                            value={props.propCourseId}
                            autoComplete="none"
                        />
                        <FormHelperText hidden={isUndefined(state.errors.courseId)}>
                            {state.errors.courseId?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.description)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.description" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("description")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.description",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.description)}
                        >
                            {state.errors.description?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item direction="row" xs={12} className="padding-top-sm">
                <Grid container item direction="column" xs={12} md={7}></Grid>
                <Grid container item direction="column" xs={5}>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
                    >
                        {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                        {computed.isSubmitting && <CircularProgress />}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    </form>
};