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
import { useSubjectApi } from "@infrastructure/apis/api-management/subject";
import { UserSimpleDTO, CourseSimpleDTO } from "@infrastructure/apis/client";
import AddSubjectUserButton from '@presentation/components/ui/Buttons/SubjectUserAddButton';
import DeleteSubjectUserButton from '@presentation/components/ui/Buttons/SubjectUserDeleteButton';
import {Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

const useUserHeader = (): { key: keyof UserSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "email", name: formatMessage({ id: "globals.email" }) },
        { key: "group", name: formatMessage({ id: "globals.group" }) },
        { key: "id", name: formatMessage({ id: "globals.id" }) }
    ]
};

const useCourseHeader = (): { key: keyof CourseSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "professorName", name: formatMessage({ id: "globals.professorName" }) },
        { key: "startTime", name: formatMessage({ id: "globals.startTime" }) },
        { key: "location", name: formatMessage({ id: "globals.location" }) },
        { key: "dayOfWeek", name: formatMessage({ id: "globals.dayOfWeek" }) },
        { key: "series", name: formatMessage({ id: "globals.series" }) }
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

const getCourseRowValues = (entries: CourseSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const SingleSubjectPage = memo(() => {
    const { subjectId } = useParams();
    const { getSubject: { key: getSubjectQueryKey, query: getSubject } } = useSubjectApi();
    const { data, isError, isLoading } = useQuery([getSubjectQueryKey], () => getSubject(subjectId ?? ""));
    const { formatMessage } = useIntl();
    const subject = data?.response;
    const queryClient = useQueryClient();
    const subjectUsers = subject?.subjectUsers;
    const subjectCourses = subject?.courses;
    const userHeader = useUserHeader();
    const courseHeader = useCourseHeader();
    const orderUserMap = userHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderCourseMap = courseHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const userRowValues = getUserRowValues(subjectUsers, orderUserMap);
    const courseRowValues = getCourseRowValues(subjectCourses, orderCourseMap);
    const [addButtonPressed, setAddButtonPressed] = useState(false);
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
    const [search, setSearch] = useState("");
    const handleAddButtonPress = () => {
        setAddButtonPressed(true);
        tryReload()
        // Perform any additional logic here
    };
    const handleDeleteButtonPress = () => {
        setDeleteButtonPressed(true);
        tryReload()
        // Perform any additional logic here
    };

    const tryReload = useCallback(() => {
        setAddButtonPressed(false);
        setDeleteButtonPressed(false);
        queryClient.invalidateQueries([getSubjectQueryKey]);
    }, [queryClient, getSubjectQueryKey]);

    if (isError || isUndefined(subject)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }
    {addButtonPressed && tryReload()}
    {deleteButtonPressed && tryReload()}

    return (
        <Fragment>
            <Seo title="Subject" />

            <WebsiteLayout>
                <BlueBackground></BlueBackground>
                <Box sx={{ padding: "0px 10px" }}>

                    <ContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/subjects" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
                                <Button variant="outlined" style={{ background: '#024180', color: 'white' }}>
                                    Inapoi
                                </Button>
                            </Link>

                        </div>
                        <br/>
                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            {subject.name}
                        </Typography>
                        <Typography variant="h6" style={{ textAlign: 'center'}}>
                            Anul {subject.year} - Semestrul {subject.semester} - {subject.creditsNo} PC
                        </Typography>
                        <br/>

                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Cursuri
                        </Typography>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {courseHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courseRowValues?.map(({ data, entry }, rowIndex) =>
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) =>
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>
                                            )}
                                                <TableCell>
                                                    <Link to={`/courses/${entry.id}`}>
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
                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Studenti
                        </Typography>
                        {subject.id && (
                            <AddSubjectUserButton subjectId={subject.id} onAddButtonPress={handleAddButtonPress}>
                                Adauga Student
                            </AddSubjectUserButton>
                        )}
                        <br/>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {userHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                    </TableRow>
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
                                                {entry.id && (
                                                    <DeleteSubjectUserButton subjectUserId={entry.id}  onDeleteButtonPress={handleDeleteButtonPress}/>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <br/>
                        <Typography variant="h6" align ="center">
                            Pentru mai multe detalii accesati{' '}
                            {subject.description && (
                                <Link to={subject.description} target="_blank" rel="noopener noreferrer">
                                    pagina materiei
                                </Link>
                            )}
                            .
                        </Typography>
                    </ContentCard>
                </Box>

            </WebsiteLayout>

        </Fragment>
    );
});
