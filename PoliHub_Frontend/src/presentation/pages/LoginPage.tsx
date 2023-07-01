import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import { useIntl } from "react-intl";
import { Link, useNavigate, RedirectFunction } from "react-router-dom";
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
                        borderTop: "2rem solid",
                        left: 0, // Position the div from the left edge of the viewport
                        right: 0, // Position the div from the right edge of the viewport
                        top: 0, // Position the div from the top edge of the viewport
                    }}
                >
                    <LoginForm />
                </div>
            </WebsiteLayout>
        </Fragment>
    );
});
