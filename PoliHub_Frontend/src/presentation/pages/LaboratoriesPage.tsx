import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { LaboratoryTable } from "@presentation/components/ui/Tables/LaboratoryTable";

export const LaboratoriesPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Laboratories" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <LaboratoryTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
