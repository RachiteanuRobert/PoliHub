import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { SubjectTable } from "@presentation/components/ui/Tables/SubjectTable";

export const SubjectsPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Subjects" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <SubjectTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
