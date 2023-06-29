import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import React, { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { useUserApi } from "@infrastructure/apis/api-management";
import { useQuery } from "@tanstack/react-query";
import { useOwnUserHasRole, useOwnUser } from "@infrastructure/hooks/useOwnUser";
import { TimetableClassesDTO } from "@infrastructure/apis/client";
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
import Typography from '@mui/material/Typography';

const useTimetableHeader = (): { key: keyof TimetableClassesDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "type", name: formatMessage({ id: "globals.type" }) },
        { key: "subjectName", name: formatMessage({ id: "globals.subject" }) },
        { key: "dayOfWeekPrint", name: formatMessage({ id: "globals.dayOfWeek" }) },
        { key: "startTime", name: formatMessage({ id: "globals.startTime" }) },
        { key: "location", name: formatMessage({ id: "globals.location" }) },
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

const getTimetableRowValues = (entries: TimetableClassesDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const UserSchedulePage = memo(() => {
    const { formatMessage } = useIntl();
    const currentUser = useOwnUser();

    const currentUserId = currentUser?.id ?? "";
    const { getTimetable: { key: getTimetableQueryKey, query: getTimetable } } = useUserApi();
    const { data, isError, isLoading } = useQuery([getTimetableQueryKey], () => getTimetable(currentUserId));
    const timetable = data?.response;

    const timetableHeader = useTimetableHeader();
    const orderTimetableMap = timetableHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const timetableRowValues = getTimetableRowValues(timetable, orderTimetableMap);

    return (
        <Fragment>
            <Seo title="Orar" />
            <BlueBackground />
            <WebsiteLayout>
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ padding: "20px" }}>
                        <ContentCard>
                            <Typography variant="h3" align="center" fontWeight ="bold">
                                Orar
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#024180" }}>
                                            {timetableHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                            <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {timetableRowValues?.map(({ data, entry }, rowIndex) =>
                                            <TableRow key={`row_${rowIndex + 1}`}>
                                                {data.map((keyValue, index) =>
                                                    <TableCell  key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                        {formatValue(keyValue.value)}
                                                    </TableCell>
                                                )}

                                                <TableCell>
                                                    {entry.type === "Curs" && (
                                                        <Link to={`/courses/${entry.classId}`}>
                                                            <InfoIcon />
                                                        </Link>
                                                    )}
                                                    {entry.type === "Laborator" && (
                                                        <Link to={`/laboratories/${entry.classId}`}>
                                                            <InfoIcon />
                                                        </Link>
                                                    )}
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
