import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { SubjectTable } from "@presentation/components/ui/Tables/SubjectTable";
import Typography from '@mui/material/Typography';

export const SubjectsPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Subjects" />
            <WebsiteLayout>
                <Box sx={{ padding: "20px" }}>
                    <ContentCard>
                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            Materii
                        </Typography>

                        <SubjectTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
