import { useLaboratoryApi } from "@infrastructure/apis/api-management/laboratory";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import React, {Fragment, memo, useCallback, useState} from "react";
import {Box, styled} from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Navigate,Link, useParams, useLocation } from 'react-router-dom';
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
import {UserSimpleDTO, LaboratoryInstanceSimpleDTO, UserRoleEnum} from "@infrastructure/apis/client";
import AddLaboratoryUserButton from '@presentation/components/ui/Buttons/LaboratoryUserAddButton';
import { LaboratoryInstanceAddDialog } from '@presentation/components/ui/Dialogs/LaboratoryInstanceDialog';
import DeleteLaboratoryUserButton from '@presentation/components/ui/Buttons/LaboratoryUserDeleteButton';
import InfoIcon from "@mui/icons-material/Info";
import {useOwnUser, useOwnUserHasRole} from "@infrastructure/hooks/useOwnUser";
import { toast } from "react-toastify";

const useUserHeader = (): { key: keyof UserSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "email", name: formatMessage({ id: "globals.email" }) },
        { key: "group", name: formatMessage({ id: "globals.group" }) },
        { key: "id", name: formatMessage({ id: "globals.id" }) }
    ]
};

const useLaboratoryInstanceHeader = (): { key: keyof LaboratoryInstanceSimpleDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "laboratoryInstanceDate", name: formatMessage({ id: "globals.date" }) },
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

const getLaboratoryInstanceRowValues = (entries: LaboratoryInstanceSimpleDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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

const getUserId = () => {
    const ownUser = useOwnUser();

    if (isUndefined(ownUser)){
        return "";
    }

    return ownUser.id;
}

export const SingleLaboratoryPage = memo(() => {
    const { formatMessage } = useIntl();
    const {laboratoryId} = useParams();
    const { getLaboratory: { key: getLaboratoryQueryKey, query: getLaboratory } } = useLaboratoryApi();
    const { data, isError, isLoading } = useQuery(
        [getLaboratoryQueryKey],
        () => getLaboratory(laboratoryId ?? ""),
        {
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );
    const laboratory = data?.response;
    const queryClient = useQueryClient();
    const laboratoryUsers = laboratory?.laboratoryUsers;
    const laboratoryLaboratoryInstances = laboratory?.laboratoryInstances;
    const userHeader = useUserHeader();
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isStudent = useOwnUserHasRole(UserRoleEnum.Student);
    const laboratoryInstanceHeader = useLaboratoryInstanceHeader();
    const orderUserMap = userHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const orderLaboratoryInstanceMap = laboratoryInstanceHeader.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const userRowValues = getUserRowValues(laboratoryUsers, orderUserMap);
    const laboratoryInstanceRowValues = getLaboratoryInstanceRowValues(laboratoryLaboratoryInstances, orderLaboratoryInstanceMap);
    const [addButtonPressed, setAddButtonPressed] = useState(false);
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
    const weekdayName = DayOfWeekMap(laboratory?.dayOfWeek);
    const linkToCourse = "/courses/" + (laboratory?.courseId ?? "");

    {/*
    if (getUserId() == "") {
        const location = useLocation();
        toast.error(formatMessage({ id: "notifications.errors.accessDenied" }));
        return <Navigate to="/login" state={{ prevUrl: location.pathname }} />;
    }
    */}

    const handleAddButtonPress = () => {
        setAddButtonPressed(true);
        // Perform any additional logic here
    };
    const handleDeleteButtonPress = () => {
        setDeleteButtonPressed(true);
        // Perform any additional logic here
    };

    const tryReload = useCallback(
        () => queryClient.invalidateQueries([getLaboratoryQueryKey]),
        [queryClient, getLaboratoryQueryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    if (isError || isUndefined(laboratory)) {
        return <>Loading</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="Laboratory" />

            <WebsiteLayout>
                <BlueBackground></BlueBackground>
                <Box sx={{ padding: "0px 10px" }}>

                    <ContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={linkToCourse} style={{ textDecoration: 'none', marginBottom: '1rem' }}>
                                <Button variant="outlined" style={{ background: '#024180', color: 'white' }}>
                                    Inapoi
                                </Button>
                            </Link>
                        </div>
                        <br/>

                        <Typography variant="h3" style={{ marginTop: '1rem', textAlign: 'center', fontWeight:'bold'}}>
                            Laborator {laboratory?.course?.subject?.name}
                        </Typography>

                        <Typography variant="h4" style={{ textAlign: 'center'}}>
                            {laboratory.assistantName} - {laboratory.location} - {weekdayName} - {laboratory.startTime}
                        </Typography>
                        <br/>
                        <br/>

                        <Typography variant="h4" align="center" fontWeight ="bold">
                            Instante de Laborator
                        </Typography>
                        {!isStudent &&
                            <LaboratoryInstanceAddDialog
                                laboratoryId = {laboratoryId ?? ""}
                                onAddButtonPress={() => {
                                    tryReload();
                                    handleAddButtonPress();
                                }}
                            />
                        }
                        <br/>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#024180" }}>
                                        {laboratoryInstanceHeader.map(e => <TableCell sx={{color: "#FFFFFF"}}  key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {laboratoryInstanceRowValues?.map(({ data, entry }, rowIndex) =>
                                        <TableRow key={`row_${rowIndex + 1}`}>
                                            {data.map((keyValue, index) =>
                                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{formatValue(keyValue.value)}</TableCell>
                                            )}
                                            <TableCell>
                                                <Link to={`/laboratoryInstances/${entry.id}`}>
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
                        {laboratory.id && isAdmin &&(
                            <AddLaboratoryUserButton
                                laboratoryId={laboratory.id}
                                onAddButtonPress={handleAddButtonPress}>
                                Adauga Student
                            </AddLaboratoryUserButton>
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
                                                    <DeleteLaboratoryUserButton
                                                        laboratoryUserId={entry.id}
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
