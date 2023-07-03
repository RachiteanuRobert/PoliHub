import { useCourseApi } from "@infrastructure/apis/api-management/course";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import React, {Fragment, memo, useCallback, useState} from "react";
import {Box, styled} from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Link, useParams } from 'react-router-dom';
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
import {UserSimpleDTO, CourseInstanceSimpleDTO, LaboratorySimpleDTO, UserRoleEnum} from "@infrastructure/apis/client";
import AddCourseUserButton from '@presentation/components/ui/Buttons/CourseUserAddButton';
import { CourseInstanceAddDialog } from '@presentation/components/ui/Dialogs/CourseInstanceDialog';
import { LaboratoryAddDialog } from '@presentation/components/ui/Dialogs/LaboratoryDialog';
import DeleteCourseUserButton from '@presentation/components/ui/Buttons/CourseUserDeleteButton';
import InfoIcon from "@mui/icons-material/Info";
import {useOwnUserHasRole} from "@infrastructure/hooks/useOwnUser";

const useUserHeader = (): { key: keyof UserSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "email", name: formatMessage({ id: "globals.email" }) },
        { key: "group", name: formatMessage({ id: "globals.group" }) },
        { key: "id", name: formatMessage({ id: "globals.id" }) }
    ]
};

const useCourseInstanceHeader = (): { key: keyof CourseInstanceSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "courseInstanceDate", name: formatMessage({ id: "globals.date" }) },
    ]
};

const useLaboratoryHeader = (): { key: keyof LaboratorySimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "assistantName", name: formatMessage({ id: "globals.assistantName" }) },
        { key: "startTime", name: formatMessage({ id: "globals.startTime" }) },
        { key: "duration", name: formatMessage({ id: "globals.duration" }) },
        { key: "location", name: formatMessage({ id: "globals.location" }) },
        { key: "dayOfWeek", name: formatMessage({ id: "globals.dayOfWeek" }) },
    ]
};

const getUserRowValues = (entries: UserSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

const getCourseInstanceRowValues = (entries: CourseInstanceSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

const getLaboratoryRowValues = (entries: LaboratorySimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => {
        return {
            entry: entry,
            data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { return { key, value } })
        }
    });

const DayOfWeekMap = (value: any) => {
    if (value == 1)
        return "Luni"
    if (value == 2)
        return "Marti"
    if (value == 3)
        return "Miercuri"
    if (value == 4)
        return "Joi"
    if (value == 5)
        return "Vineri"

    return value;
}

const formatValue = (value: any) => {
    if (value instanceof Date) {
        let day = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return value;
};

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

export const SingleCoursePage = memo(() => {
    const {courseId} = useParams();
    const { getCourse: { key: getCourseQueryKey, query: getCourse } } = useCourseApi();
    const { data, isError, isLoading } = useQuery([getCourseQueryKey], () => getCourse(courseId ?? ""));
    const { formatMessage } = useIntl();
    const course = data?.response;
    const queryClient = useQueryClient();
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isStudent = useOwnUserHasRole(UserRoleEnum.Student);
    const courseUsers = course?.courseUsers;
    const courseCourseInstances = course?.courseInstances;
    const courseLaboratories = course?.laboratories;
    const userHeader = useUserHeader();
    const courseInstanceHeader = useCourseInstanceHeader();
    const laboratoryHeader = useLaboratoryHeader();
    const orderUserMap = userHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderCourseInstanceMap = courseInstanceHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderLaboratoryMap = laboratoryHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const userRowValues = getUserRowValues(courseUsers, orderUserMap);
    const courseInstanceRowValues = getCourseInstanceRowValues(courseCourseInstances, orderCourseInstanceMap);
    const laboratoryRowValues = getLaboratoryRowValues(courseLaboratories, orderLaboratoryMap);
    const [addButtonPressed, setAddButtonPressed] = useState(false);
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
    const weekdayName = DayOfWeekMap(course?.dayOfWeek);
    const linkToSubject = "/subjects/" + (course?.subjectId ?? "");
    const handleAddButtonPress = () => {
        setAddButtonPressed(true);
        // Perform any additional logic here
    };
    const handleDeleteButtonPress = () => {
        setDeleteButtonPressed(true);
        // Perform any additional logic here
    };

    const tryReload = useCallback(() => {
        if (addButtonPressed || deleteButtonPressed) {
            setAddButtonPressed(false);
            setDeleteButtonPressed(false);
            queryClient.invalidateQueries([getCourseQueryKey]);
        }
    }, [queryClient, getCourseQueryKey, addButtonPressed, deleteButtonPressed]);

    if (isError || isUndefined(course)) {
        return <>Loading</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="Course" />

            <WebsiteLayout>
                <BlueBackground></BlueBackground>
                <Box sx={{ padding: "0px 10px" }}>

                    <ContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={linkToSubject} style={{ textDecoration: 'none', marginBottom: '1rem' }}>
                                <Button variant="outlined" style={{ background: '#024180', color: 'white' }}>
                                    Inapoi
                                </Button>
                            </Link>

                        </div>
                        <br/>
                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            Curs {course?.subject?.name} - {course.series}
                        </Typography>

                        <Typography variant="h4" style={{ textAlign: 'center'}}>
                            {course.professorName} - {course.location} - {weekdayName} - {course.startTime}
                        </Typography>
                        <br/>
                        <br/>

                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Instante de Curs
                        </Typography>
                        {!isStudent &&
                            <CourseInstanceAddDialog
                                courseId = {courseId ?? ""}
                                onAddButtonPress={() => {
                                    handleAddButtonPress();
                                }}
                            />
                        }
                        <br/>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {courseInstanceHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courseInstanceRowValues?.map(({ data, entry }, rowIndex) =>
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) =>
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{formatValue(keyValue.value)}</TableCell>
                                            )}
                                            <TableCell>
                                                <Link to={`/courseInstances/${entry.id}`}>
                                                    <InfoIcon />
                                                </Link>
                                            </TableCell>

                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Laboratoare
                        </Typography>
                        {isAdmin &&
                        <LaboratoryAddDialog
                            courseId = {courseId ?? ""}
                            onAddButtonPress={() => {
                                handleAddButtonPress();
                            }}
                        />
                        }
                        <br/>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {laboratoryHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {laboratoryRowValues?.map(({ data, entry }, rowIndex) =>
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) =>
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{DayOfWeekMap(keyValue.value)}</TableCell>
                                            )}
                                            <TableCell>
                                                <Link to={`/laboratories/${entry.id}`}>
                                                    <InfoIcon />
                                                </Link>
                                            </TableCell>

                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Studenti
                        </Typography>
                        {course.id && isAdmin && (
                            <AddCourseUserButton
                                courseId={course.id}
                                onAddButtonPress={handleAddButtonPress}>
                                Adauga Student
                            </AddCourseUserButton>
                        )}
                        <br/>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {userHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        {isAdmin && <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell> }
                                        {!isAdmin && <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}></TableCell> }                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userRowValues?.map(({ data, entry }, rowIndex) => (
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) => (
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                    {keyValue.value}
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                {entry.id && isAdmin &&(
                                                    <DeleteCourseUserButton
                                                        courseUserId={entry.id}
                                                        onDeleteButtonPress={handleDeleteButtonPress}/>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
});
