import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { CourseTable } from "@presentation/components/ui/Tables/CourseTable";
import Typography from "@mui/material/Typography";

export const CoursesPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Courses" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            Cursuri
                        </Typography>
                        <CourseTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
