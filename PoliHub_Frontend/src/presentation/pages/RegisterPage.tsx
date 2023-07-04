import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm";

const divStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const RegisterPage = memo(() => {
    const { formatMessage } = useIntl();
    return (
        <Fragment>
            <Seo title="MobyLab Web App | Register" />
            <WebsiteLayout>
                <div
                    style={{
                        backgroundImage: `url(public/upb-rectorat.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "100vh",
                        position: "fixed",
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                >
                    <RegisterForm />
                </div>
            </WebsiteLayout>
        </Fragment>
    );
});
