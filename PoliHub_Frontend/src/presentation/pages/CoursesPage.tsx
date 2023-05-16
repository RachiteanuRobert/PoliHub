import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { CourseTable } from "@presentation/components/ui/Tables/CourseTable";

export const CoursesPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Courses" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <CourseTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
