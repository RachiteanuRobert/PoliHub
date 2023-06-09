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
import { useSubjectFormController } from "./SubjectForm.controller";
import { isEmpty, isUndefined } from "lodash"

/**
 * Here we declare the Subject add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const SubjectForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useSubjectFormController(props.onSubmit); // Use the controller.

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
                        error={!isUndefined(state.errors.year)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.year" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("year")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.year",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.year)}
                        >
                            {state.errors.year?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.professor)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.professor" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("professor")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.professor",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.professor)}
                        >
                            {state.errors.professor?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.department)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.department" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("department")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.department",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.department)}
                        >
                            {state.errors.department?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.creditsno)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.creditsno" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("creditsno")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.creditsno",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.creditsno)}
                        >
                            {state.errors.creditsno?.message}
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
                    <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                        {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                        {computed.isSubmitting && <CircularProgress />}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    </form>
};