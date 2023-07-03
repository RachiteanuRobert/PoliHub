import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { UserTable } from "@presentation/components/ui/Tables/UserTable";
import Typography from "@mui/material/Typography";

export const UsersPage = memo(() => {
  return <Fragment>
    <Seo title="MobyLab Web App | Users" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
            Utilizatori
          </Typography>
          <UserTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
