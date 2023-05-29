import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useLoginFormController } from "./LoginForm.controller";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";

/**
 * Here we declare the login form component.
 */
export const LoginForm = () => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useLoginFormController(); // Use the controller.

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                backgroundColor: "transparent", // Set the background color of the form to transparent
            }}
        >
            <form
                onSubmit={actions.handleSubmit(actions.submit)}
                style={{
                    width: "100%",
                    maxWidth: "400px", // Set the maximum width of the form for flexibility
                    margin: "auto", // Center the form horizontally
                    padding: "1rem", // Add padding for spacing
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Set a transparent background color for the form
                    borderRadius: "8px", // Add rounded corners
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                }}
            >
                <Stack spacing={4} style={{ width: "100%" }}>
                    <ContentCard title={formatMessage({ id: "globals.login" })}>
                        <Grid container item direction="row" xs={12} columnSpacing={4}>
                            <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
                                <FormControl
                                    fullWidth
                                    error={!isUndefined(state.errors.email)}
                                >
                                    <FormLabel required>
                                        <FormattedMessage id="globals.email" />
                                    </FormLabel>
                                    <OutlinedInput
                                        {...actions.register("email")}
                                        placeholder={formatMessage(
                                            { id: "globals.placeholders.textInput" },
                                            {
                                                fieldName: formatMessage({
                                                    id: "globals.email",
                                                }),
                                            }
                                        )}
                                        autoComplete="username"
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.email)}>
                                        {state.errors.email?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid container item direction="column" xs={12} md={12}>
                                <FormControl
                                    fullWidth
                                    error={!isUndefined(state.errors.password)}
                                >
                                    <FormLabel required>
                                        <FormattedMessage id="globals.password" />
                                    </FormLabel>
                                    <OutlinedInput
                                        type="password"
                                        {...actions.register("password")}
                                        placeholder={formatMessage(
                                            { id: "globals.placeholders.textInput" },
                                            {
                                                fieldName: formatMessage({
                                                    id: "globals.password",
                                                }),
                                            }
                                        )}
                                        autoComplete="current-password"
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.password)}>
                                        {state.errors.password?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </ContentCard>
                    <Grid container item direction="row" xs={12} className="padding-top-sm">
                        <Grid container item direction="column" xs={12} md={7}></Grid>
                        <Grid container item direction="column" xs={5}>
                            <Button
                                type="submit"
                                disabled={!isEmpty(state.errors) || computed.isSubmitting}
                                style={{ width: "100%" }}
                            >
                                {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                                {computed.isSubmitting && <CircularProgress />}
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </form>
        </div>
    );
};
