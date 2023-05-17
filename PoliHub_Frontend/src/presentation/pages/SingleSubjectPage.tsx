import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, Typography} from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {Link, useParams} from 'react-router-dom';
import { useIntl } from "react-intl";
import { useSubjectApi } from "@infrastructure/apis/api-management/subject";


export const SingleSubjectPage = memo(() => {
    const {subjectId} = useParams();
    const { formatMessage } = useIntl();
    const { getSubject: { key: getSubjectQueryKey, query: getSubject } } = useSubjectApi();
    const { data, isError, isLoading } = useQuery([getSubjectQueryKey], () => getSubject(subjectId ?? ""));
    const subject = data?.response;
    if (isError || isUndefined(subject)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="Subject" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Link to='/subjects'>Inapoi la Materii</Link>
                        <h2>{subjectId}</h2>
                        <h2>{subject.name}</h2>
                        <h2>{subject.year}</h2>
                        <h2>{subject.department}</h2>
                    </ContentCard>
                </Box>
                {subject.students && subject.students.length > 0 && <Typography variant="h4">
                    {formatMessage({ id: "globals.students" })}
                </Typography>}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {subject.students?.map(student => (<div style={{ margin: "2rem" }}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" component="h2">
                                    {student.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {student.group}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    ))}
                </div>
            </WebsiteLayout>
        </Fragment>
    );
});
