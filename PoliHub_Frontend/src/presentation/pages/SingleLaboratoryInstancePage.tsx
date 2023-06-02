import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
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
import { useLaboratoryInstanceApi } from "@infrastructure/apis/api-management/laboratoryInstance";
import { UserSimpleDTO } from "@infrastructure/apis/client";
import {getIpAddress} from "@infrastructure/utils/getIpAddress";
import QRCode from 'react-qr-code';

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

export const SingleLaboratoryInstancePage = memo(() => {
    const { laboratoryInstanceId } = useParams();
    const { getLaboratoryInstance: { key: getLaboratoryInstanceQueryKey, query: getLaboratoryInstance } } = useLaboratoryInstanceApi();
    const { data, isError, isLoading } = useQuery([getLaboratoryInstanceQueryKey], () => getLaboratoryInstance(laboratoryInstanceId ?? ""));
    const { formatMessage } = useIntl();
    const laboratoryInstance = data?.response;
    const laboratoryInstanceUsers = laboratoryInstance?.laboratoryInstanceUsers;
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const rowValues = getRowValues(laboratoryInstanceUsers, orderMap);
    const ipAddr = getIpAddress();
    const qrValue = `http://${ipAddr}:3000/laboratoryinstances/${laboratoryInstanceId}`;

    if (isError || isUndefined(laboratoryInstance)) {
        return <>Error</>
    }
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <Fragment>
            <Seo title="LaboratoryInstance" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 10px" }}>
                    <ContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/laboratoryInstances" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
                                <Button variant="outlined" style={{ background: '#1976d2', color: 'white' }}>
                                    Inapoi
                                </Button>
                            </Link>
                            <Typography variant="h6" style={{ marginBottom: '0.5rem', textAlign: 'right' }}>
                                {formatValue(laboratoryInstance.laboratoryInstanceDate) ?? formatMessage({ id: "global.loadingFailed" })}
                            </Typography>
                        </div>
                        <QRCode value= {qrValue} />
                        <Typography variant="h4" style={{ marginTop: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                            {laboratoryInstance.name}
                        </Typography>
                        <Typography variant="h6">
                            Pentru mai multe detalii accesati pagina laboratorului:
                        </Typography>
                        <Typography variant="h6" style={{ marginBottom: '1rem'}}>
                            {laboratoryInstance.description}
                        </Typography>
                        <Typography variant="h5">
                            Studenti
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
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
