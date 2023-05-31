import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const HomePage = memo(() => {
    const { formatMessage } = useIntl();

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Home" />
            <WebsiteLayout>
                <div
                    style={{
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "100vh",
                        padding: "2rem",
                        marginTop: "80px", // Add margin-top for spacing
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        style={{
                            color: "blue",
                            marginBottom: "2rem",
                            fontSize: "3.5rem",
                            textAlign: "center",
                            fontFamily: "Oxygen, Arial, sans-serif",
                            wordBreak: "break-word",
                        }}
                    >
                        O cariera de succes incepe cu o educatie de calitate!
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            fontSize: "1.75rem",
                            textAlign: "center",
                            fontFamily: "Oxygen, Arial, sans-serif",
                            maxWidth: "800px",
                            margin: "0 auto",
                        }}
                    >
                        Obtinand cunostintele de care aveti nevoie in subiectele care va
                        preocupa, veti fi gata sa va atingeti potentialul.
                    </Typography>
                    <Button
                        component={Link}
                        to="/subjects"
                        variant="outlined"
                        style={{
                            color: "blue",
                            borderColor: "blue",
                            textTransform: "none",
                            marginTop: "1rem",
                            padding: "1rem 2rem",
                            fontSize: "1.2rem",
                        }}
                    >
                        Vezi Materiile
                    </Button>
                    <div style={{ marginTop: "2rem" }}>
                        <img
                            src="https://cardiff.imgix.net/__data/assets/image/0018/480015/chemistry-students-in-lecture-theatre.jpeg"
                            alt="Chemistry students in lecture theatre"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                        <img
                            src="https://i0.wp.com/unibuc.ro/wp-content/uploads/2020/01/camine-studentesti.jpg"
                            alt="Student housing"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                boxShadow: "0 10px 200px rgba(0, 0, 50, 0.2)",
                            }}
                        />
                    </div>
                </div>
            </WebsiteLayout>
        </Fragment>
    );
});
