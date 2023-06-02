import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import React, { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {useUserApi} from "@infrastructure/apis/api-management";
import {useQuery} from "@tanstack/react-query";
import {useOwnUserHasRole, useOwnUser} from "@infrastructure/hooks/useOwnUser";
import {LaboratoryInstanceSimpleDTO, UserSimpleDTO, CourseInstanceSimpleDTO} from "@infrastructure/apis/client";
import {useIntl} from "react-intl";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {isUndefined} from "lodash";

const useLaboratoryInstancesHeader = (): { key: keyof LaboratoryInstanceSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "laboratoryInstanceDate", name: formatMessage({ id: "globals.laboratoryInstanceDate" }) },
    ]
};

const useCourseInstancesHeader = (): { key: keyof CourseInstanceSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "courseInstanceDate", name: formatMessage({ id: "globals.courseInstanceDate" }) },
    ]
};

const getLaboratoryInstancesRowValues = (entries: LaboratoryInstanceSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

const getCourseInstancesRowValues = (entries: CourseInstanceSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

export const UserAttendancesPage = memo(() => {
    const currentUser = useOwnUser()
    const { getUser: { key: getUserQueryKey, query: getUser } } = useUserApi();
    const courseInstancesHeader = useCourseInstancesHeader();
    const laboratoyInstancesHeader = useLaboratoryInstancesHeader();
    const orderLaboratoryInstanceMap = laboratoyInstancesHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderCourseInstanceMap = courseInstancesHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.

    const courseInstancesRowValues = getCourseInstancesRowValues(currentUser?.courseInstanceUsers, orderCourseInstanceMap);
    const laboratoryInstancesRowValues = getLaboratoryInstancesRowValues(currentUser?.laboratoryInstanceUsers, orderLaboratoryInstanceMap);
    const { data, isError, isLoading } = useQuery([getUserQueryKey], () => getUser(currentUser?.id ?? ""));

    return (
        <Fragment>
            <Seo title="Subjects" />
            <WebsiteLayout>
                <Box sx={{ padding: "20px" }}>
                    <ContentCard>
                        <h2>{currentUser?.id}</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {courseInstancesHeader.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courseInstancesRowValues?.map(({ data, entry }, rowIndex) =>
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
