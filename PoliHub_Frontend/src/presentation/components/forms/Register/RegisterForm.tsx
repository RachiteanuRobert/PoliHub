import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useRegisterFormController } from "./RegisterForm.controller";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";

/**
 * Here we declare the register form component.
 */
export const RegisterForm = () => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useRegisterFormController(); // Use the controller.

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                backgroundColor: "transparent",
            }}
        >
            <form
                onSubmit={actions.handleSubmit(actions.submit)}
                style={{
                    width: "70%",
                    maxWidth: "400px",
                    margin: "auto",
                    padding: "1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Stack spacing={2} style={{ width: "100%" }}>
                    <ContentCard title={formatMessage({ id: "globals.register" })}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!isUndefined(state.errors.name)}>
                                    <FormLabel required>
                                        <FormattedMessage id="globals.name" />
                                    </FormLabel>
                                    <OutlinedInput
                                        {...actions.register("name")}
                                        placeholder={formatMessage(
                                            { id: "globals.placeholders.textInput" },
                                            {
                                                fieldName: formatMessage({
                                                    id: "globals.name",
                                                }),
                                            }
                                        )}
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.name)}>
                                        {state.errors.name?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!isUndefined(state.errors.email)}>
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
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.email)}>
                                        {state.errors.email?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!isUndefined(state.errors.password)}>
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
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.password)}>
                                        {state.errors.password?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!isUndefined(state.errors.role)}>
                                    <FormLabel required>
                                        <FormattedMessage id="globals.role" />
                                    </FormLabel>
                                    <OutlinedInput
                                        {...actions.register("role")}
                                        placeholder={formatMessage(
                                            { id: "globals.placeholders.textInput" },
                                            {
                                                fieldName: formatMessage({
                                                    id: "globals.role",
                                                }),
                                            }
                                        )}
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.role)}>
                                        {state.errors.role?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!isUndefined(state.errors.group)}>
                                    <FormLabel required>
                                        <FormattedMessage id="globals.group" />
                                    </FormLabel>
                                    <OutlinedInput
                                        {...actions.register("group")}
                                        placeholder={formatMessage(
                                            { id: "globals.placeholders.textInput" },
                                            {
                                                fieldName: formatMessage({
                                                    id: "globals.group",
                                                }),
                                            }
                                        )}
                                    />
                                    <FormHelperText hidden={isUndefined(state.errors.group)}>
                                        {state.errors.group?.message}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </ContentCard>
                    <Grid container direction="row" xs={12} className="padding-top-sm">
                        <Grid container item direction="column" xs={12} md={7}></Grid>
                        <Grid container item direction="column" xs={5}>
                            <Button
                                variant="contained"
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
