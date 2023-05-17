import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {Link, useParams} from 'react-router-dom';
import { useLaboratoryApi } from "@infrastructure/apis/api-management/laboratory";


export const SingleLaboratoryPage = memo(() => {
    const {laboratoryId} = useParams();
    const { getLaboratory: { key: getLaboratoryQueryKey, query: getLaboratory } } = useLaboratoryApi();
    const { data, isError, isLoading } = useQuery([getLaboratoryQueryKey], () => getLaboratory(laboratoryId ?? ""));
    const laboratory = data?.response;
    if (isError || isUndefined(laboratory)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="Laboratory" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Link to='/laboratories'>Inapoi la Laboratoare</Link>
                        <h2>{laboratoryId}</h2>
                        <h2>{laboratory.assistantName}</h2>
                        <h2>{laboratory.startTime}</h2>
                        <h2>{laboratory.duration}</h2>
                        <h2>{laboratory.location}</h2>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
