import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import {useOwnUserHasRole, useTokenHasExpired} from "@infrastructure/hooks/useOwnUser";
import React, { Fragment, memo } from "react";
import {Box, styled} from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import { useIntl } from "react-intl";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import { useCourseInstanceApi } from "@infrastructure/apis/api-management/courseInstance";
import {UserRoleEnum, UserSimpleDTO} from "@infrastructure/apis/client";
import {getIpAddress} from "@infrastructure/utils/getIpAddress";
import QRCode from 'react-qr-code';
import {UserToCourseInstanceAddDTO} from "@infrastructure/apis/client";
import {useAppSelector} from "@application/store";


const useHeader = (): { key: keyof UserSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "email", name: formatMessage({ id: "globals.email" }) },
        { key: "group", name: formatMessage({ id: "globals.group" }) }
    ]
};

const formatValue = (value: any) => {
    if (value instanceof Date) {
        let day = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return value;
};

const getRowValues = (entries: UserSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

const BlueBackground = styled(Box)`
  background-color: #024180;
  height: 473px;
  width: 96vw;
  position: fixed;
  border-radius: 10px;
  top: 0;
  left: 2rem;
  z-index : 0;
`;

export const SingleCourseInstancePage = memo(() => {
    const { courseInstanceId } = useParams();
    const { getCourseInstance: { key: getCourseInstanceQueryKey, query: getCourseInstance } } = useCourseInstanceApi();
    const { data, isError, isLoading } = useQuery(
        [getCourseInstanceQueryKey],
        () => getCourseInstance(courseInstanceId ?? ""),
        {
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );
    const { userId } = useAppSelector(x => {
        const id = x.profileReducer.userId;
        return { userId: id === null ? undefined : id };
    });
    const { formatMessage } = useIntl();
    const courseInstance = data?.response;
    const courseInstanceUsers = courseInstance?.courseInstanceUsers;
    const backLink = "/courses/" + (courseInstance?.courseId ?? "");
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const rowValues = getRowValues(courseInstanceUsers, orderMap);
    const ipAddr = getIpAddress();
    const qrValue = `http://${ipAddr}:3000/courseinstances/${courseInstanceId}`;
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const {loggedIn, hasExpired} = useTokenHasExpired();
    const [checkedIfUserInCourseInstance, setCheckedIfUserInCourseInstance] = useState(false);
    const { getIsUserInCourseInstance: { key: getIsUserInCourseInstanceQueryKey, query: getIsUserInCourseInstance } } = useCourseInstanceApi();
    const [userToAdd, setUserToAdd] = useState<UserToCourseInstanceAddDTO>({
        userId: userId,
        courseInstanceId: courseInstanceId,
    });

    const {
        data: isUserInLabInsData,
        isLoading: isUserInLabInsLoading,
        isError: isUserInLabInsError
    } = useQuery([getIsUserInCourseInstanceQueryKey], () => getIsUserInCourseInstance(courseInstanceId ?? ""),
        {
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );
    const isUserInCourseInstance = isUserInLabInsData?.response;

    const {
        addUserToCourseInstance: {
            key: addUserToCourseInstanceMutation,
            mutation: addUserToCourseInstance
        }
    } = useCourseInstanceApi();

    useEffect(() => {
        if (loggedIn && !hasExpired && !isUndefined(courseInstanceId) &&
            checkedIfUserInCourseInstance == false &&
            !isUndefined(isUserInCourseInstance)) {
            setCheckedIfUserInCourseInstance(true);
            if (!isUserInCourseInstance && !isAdmin) {
                setUserToAdd({
                    userId: userId,
                    courseInstanceId: courseInstanceId,
                });
                addUserToCourseInstance(userToAdd);
            }
        }
    }, [loggedIn, hasExpired, courseInstanceId, isUserInCourseInstance, isAdmin, userId]);

    if (isError || isUndefined(courseInstance)) {
        return <>Loading</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="CourseInstance" />
            <BlueBackground></BlueBackground>
            <WebsiteLayout>
                <Box sx={{ padding: "0px 10px" }}>
                    <ContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={backLink} style={{ textDecoration: 'none', marginBottom: '1rem' }}>
                                <Button variant="outlined" style={{ background: '#024180', color: 'white' }}>
                                    Inapoi
                                </Button>
                            </Link>

                            <Typography variant="h5" style={{ marginBottom: '0.5rem', textAlign: 'right' }}>
                                {formatValue(courseInstance.courseInstanceDate) ?? formatMessage({ id: "global.loadingFailed" })}
                            </Typography>
                        </div>
                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            {courseInstance.name}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <QRCode value={qrValue} />
                        </div>
                        <br/>
                        <br/>
                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Studenti
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {header.map(e => <TableCell sx={{color: "#FFFFFF"}} key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowValues?.map(({ data, entry }, rowIndex) =>
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) =>
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
