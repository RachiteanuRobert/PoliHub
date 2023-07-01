import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Seo } from "@presentation/components/ui/Seo";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export const HomePage = memo(() => {
    const { formatMessage } = useIntl();
    const theme = createTheme({
        typography: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Seo title="Home" />
                <WebsiteLayout>
                    <div
                        style={{
                            background: "white",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: "100vh",
                            padding: "2rem",
                        }}
                    >
                        <img
                            src="/images/background_home.png"
                            alt="Chemistry students in lecture theatre"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />

                        <div className="container">
                            <div className="image-container">
                                <a href="/userSchedule">
                                    <img
                                        src="/images/01.orar.png"
                                        alt="Schedule"
                                        className="image"
                                    />
                                </a>
                                <a href="/userAttendances">
                                    <img
                                        src="/images/02.%20prezente.png"
                                        alt="Attendances"
                                        className="image"
                                    />
                                </a>
                                <a href="https://upb.ro">
                                    <img
                                        src="/images/03.%20UPB.RO.png"
                                        alt="UPB Image"
                                        className="image"
                                    />
                                </a>
                                <a href="https://studenti.pub.ro">
                                    <img
                                        src="/images/04.studenti.pub.png"
                                        alt="Studenti.Pub Image"
                                        className="image"
                                    />
                                </a>
                                <a href="https://curs.upb.ro/2022/my/">
                                    <img
                                        src="/images/05.%20moodle.ro.png"
                                        alt="Moodle Image"
                                        className="image"
                                    />
                                </a>
                            </div>
                        </div>

                        <Typography
                            variant="body1"
                            style={{
                                fontSize: "3.2rem",
                                fontStyle: 'italic',
                                fontFamily: "Montserrat, sans-serif",
                                margin: "0 auto",
                                marginLeft: "4rem",
                                marginTop: "2rem"
                            }}
                        >
                                 ,,Obtinand cunostintele de care aveti nevoie
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                fontSize: "3.2rem",
                                fontStyle: 'italic',
                                fontFamily: "Montserrat, sans-serif",
                                margin: "0 auto",
                                marginLeft: "10rem",
                            }}
                        >
                            in subiectele care va
                            preocupa,
                        </Typography>

                        <Typography
                            variant="body1"
                            style={{
                                fontSize: "3.2rem",
                                fontFamily: "Montserrat, sans-serif",
                                fontStyle: 'italic',
                                margin: "0 auto",
                                marginLeft: "16rem",
                            }}
                        >
                            veti fi gata sa va atingeti  potentialul."
                        </Typography>


                        <div style={{ marginTop: "2rem" }}>
                            <img
                                src="/images/Curte_Rectorat_Politehnica_Bucuresti.jpg"
                                 alt="Cladire Rectorat Polithenica"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                    </div>
                </WebsiteLayout>
            </Fragment>
        </ThemeProvider>
    );
});
