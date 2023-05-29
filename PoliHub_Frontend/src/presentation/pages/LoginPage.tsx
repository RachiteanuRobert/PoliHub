import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";

const divStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const LoginPage = memo(() => {
    const { formatMessage } = useIntl();
    return (
        <Fragment>
            <Seo title="MobyLab Web App | Login" />
            <WebsiteLayout>
                <div
                    style={{
                        backgroundImage: `url(public/upb-rectorat.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "100vh",
                        position: "fixed", // Set the position to fixed
                        left: 0, // Position the div from the left edge of the viewport
                        right: 0, // Position the div from the right edge of the viewport
                        top: 0, // Position the div from the top edge of the viewport
                    }}
                >
                    <LoginForm />
                    <div style={divStyles}>
                        <div style={{ marginRight: ".5rem" }}>
                            <Typography variant="h6" style={{ color: "white", fontSize: "170%" }}>
                                {formatMessage({ id: "globals.noAccount" })}
                            </Typography>
                        </div>
                        <Typography variant="h6" style={{ fontSize: "170%" }}>
                            <Link to={AppRoute.Register}>{formatMessage({ id: "globals.register" })}</Link>
                        </Typography>
                    </div>
                </div>
            </WebsiteLayout>
        </Fragment>
    );
});
