import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {Link, useParams} from 'react-router-dom';
import { useIntl } from "react-intl";
import { useCourseInstanceApi } from "@infrastructure/apis/api-management/courseInstance";


export const SingleCourseInstancePage = memo(() => {
    const {courseInstanceId} = useParams();
    const { formatMessage } = useIntl();
    const { getCourseInstance: { key: getCourseInstanceQueryKey, query: getCourseInstance } } = useCourseInstanceApi();
    const { data, isError, isLoading } = useQuery([getCourseInstanceQueryKey], () => getCourseInstance(courseInstanceId ?? ""));
    const courseInstance = data?.response;
    if (isError || isUndefined(courseInstance)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="CourseInstance" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Link to='/courseInstances'>Inapoi la Instantele de Curs</Link>
                        <h2>{courseInstanceId}</h2>
                        <h2>{courseInstance.name}</h2>
                        <h2>{courseInstance.courseInstanceDate?.getDate() ?? formatMessage({ id: "global.loadingFailed"})}</h2>
                        <h2>{courseInstance.description}</h2>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
