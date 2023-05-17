import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {Link, useParams} from 'react-router-dom';
import { useCourseApi } from "@infrastructure/apis/api-management/course";


export const SingleCoursePage = memo(() => {
    const {courseId} = useParams();
    const { getCourse: { key: getCourseQueryKey, query: getCourse } } = useCourseApi();
    const { data, isError, isLoading } = useQuery([getCourseQueryKey], () => getCourse(courseId ?? ""));
    const course = data?.response;
    if (isError || isUndefined(course)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="Course" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Link to='/courses'>Inapoi la Cursuri</Link>
                        <h2>{courseId}</h2>
                        <h2>{course.professorName}</h2>
                        <h2>{course.startTime}</h2>
                        <h2>{course.duration}</h2>

                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
