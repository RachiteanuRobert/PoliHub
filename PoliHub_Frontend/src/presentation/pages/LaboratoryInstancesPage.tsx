import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { LaboratoryInstanceTable } from "@presentation/components/ui/Tables/LaboratoryInstanceTable";

export const LaboratoryInstancesPage = memo(() => {
    return (
        <Fragment>
            <Seo title="Laboratory Instances" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <LaboratoryInstanceTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
