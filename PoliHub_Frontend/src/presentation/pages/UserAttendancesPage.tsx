import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import React, { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { useUserApi } from "@infrastructure/apis/api-management";
import { useQuery } from "@tanstack/react-query";
import { useOwnUserHasRole, useOwnUser } from "@infrastructure/hooks/useOwnUser";
import { LaboratoryInstanceAttendanceDTO, CourseInstanceAttendanceDTO } from "@infrastructure/apis/client";
import { useIntl } from "react-intl";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { isUndefined } from "lodash";
import { styled } from "@mui/system";
import {Link} from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";

const useLaboratoryInstancesHeader = (): { key: keyof LaboratoryInstanceAttendanceDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "subjectName", name: formatMessage({ id: "globals.subject" }) },
        { key: "laboratoryInstanceDate", name: formatMessage({ id: "globals.laboratoryInstanceDate" }) },
    ];
};

const useCourseInstancesHeader = (): { key: keyof CourseInstanceAttendanceDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "subjectName", name: formatMessage({ id: "globals.subject" }) },
        { key: "courseInstanceDate", name: formatMessage({ id: "globals.courseInstanceDate" }) },
    ];
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

const getLaboratoryInstancesRowValues = (entries: LaboratoryInstanceAttendanceDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } }),
        };
    });

const getCourseInstancesRowValues = (entries: CourseInstanceAttendanceDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } }),
        };
    });

const BlueBackground = styled(Box)`
  background-color: #024180;
  height: 473px;
  width: 96vw;
  position: fixed;
  border-radius: 10px;
  top: 0;
  left: 2rem;
`;

export const UserAttendancesPage = memo(() => {
    const { formatMessage } = useIntl();
    const currentUser = useOwnUser();

    const currentUserId = currentUser?.id ?? "";
    const { getAttendances: { key: getAttendancesQueryKey, query: getAttendances } } = useUserApi();
    const { data, isError, isLoading } = useQuery([getAttendancesQueryKey], () => getAttendances(currentUserId));
    const attendances = data?.response;

    const courseInstancesHeader = useCourseInstancesHeader();
    const laboratoryInstancesHeader = useLaboratoryInstancesHeader();
    const orderLaboratoryInstanceMap = laboratoryInstancesHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderCourseInstanceMap = courseInstancesHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.

    const courseInstancesRowValues = getCourseInstancesRowValues(attendances?.courseInstances, orderCourseInstanceMap);
    const laboratoryInstancesRowValues = getLaboratoryInstancesRowValues(attendances?.laboratoryInstances, orderLaboratoryInstanceMap);


    return (
        <Fragment>
            <Seo title="Prezente" />
            <BlueBackground />
            <WebsiteLayout>
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ padding: "20px" }}>
                        <ContentCard>
                            <Typography variant="h4" align="center" fontWeight="bold">
                                Prezente Cursuri
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#024180" }}>
                                            {courseInstancesHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                            <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {courseInstancesRowValues?.map(({ data, entry }, rowIndex) =>
                                            <TableRow key={`row_${rowIndex + 1}`}>
                                                {data.map((keyValue, index) =>
                                                    <TableCell  key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                        {formatValue(keyValue.value)}
                                                    </TableCell>
                                                )}

                                                <TableCell>
                                                    <Link to={`/courseInstances/${entry.id}`}>
                                                        <InfoIcon />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br/>
                            <br/>
                            <br/>
                            <Typography variant="h4" align="center" fontWeight="bold">
                                Prezente Laboratoare/Seminarii
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#024180" }}>
                                            {laboratoryInstancesHeader.map(e => <TableCell  sx={{color: "#FFFFFF"}} key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                            <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {laboratoryInstancesRowValues?.map(({ data, entry }, rowIndex) =>
                                            <TableRow key={`row_${rowIndex + 1}`}>
                                                {data.map((keyValue, index) =>
                                                    <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                        {formatValue(keyValue.value)}
                                                    </TableCell>
                                                    )}

                                                    <TableCell>
                                                            <Link to={`/laboratoryInstances/${entry.id}`}>
                                                        <InfoIcon />
                                                    </Link>
                                                    </TableCell>
                                            </TableRow>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ContentCard>
                    </Box>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
