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
import { useLaboratoryFormController } from "./LaboratoryForm.controller";
import { isEmpty, isUndefined } from "lodash"
import {FormActions} from "@infrastructure/utils/formUtils";

/**
 * Here we declare the Laboratory add and update form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const LaboratoryForm = (props: {
    onSubmit?: () => void;
    action: FormActions;
    propCourseId: string;
}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useLaboratoryFormController(props.action, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <Grid container item direction="row" xs={12} columnSpacing={4}>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.assistantName)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.assistantName" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("assistantName")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.assistantName",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.assistantName)}
                        >
                            {state.errors.assistantName?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.startTime)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.startTime" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("startTime")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.startTime",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.startTime)}
                        >
                            {state.errors.startTime?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.duration)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.duration" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("duration")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.duration",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.duration)}
                        >
                            {state.errors.duration?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.location)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.location" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("location")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.location",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.location)}
                        >
                            {state.errors.location?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.dayOfWeek)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.dayOfWeek" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("dayOfWeek")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.dayOfWeek",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.dayOfWeek)}
                        >
                            {state.errors.dayOfWeek?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                { props.propCourseId != "" &&
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
                }
                { props.propCourseId == "" &&
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.courseId)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.courseId" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("courseId")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.courseId",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.courseId)}
                            >
                                {state.errors.courseId?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                }
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