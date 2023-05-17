import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { SubjectDTO } from "@infrastructure/apis/client/models/SubjectDTO";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useAppSelector} from "@application/store";
import {getAuthenticationConfiguration} from "@infrastructure/utils/userUtils";
import { ApiSubjectGetByIdIdGetRequest, SubjectApi } from "@infrastructure/apis/client";


export const SingleSubjectPage = memo(() => {
    const {subjectId} = useParams();
    const [subject, setSubjectName] = useState<SubjectDTO>();
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.
    const apiSubjectService = new SubjectApi();

    const requestParams: ApiSubjectGetByIdIdGetRequest = {
        id: subjectId as string
    };


    return (
        <Fragment>
            <Seo title="Subject" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <Link to='/subjects'>Inapoi la Materii</Link>
                        <h2>{subjectId}</h2>
                        <h1>{subject?.name}</h1>

                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
