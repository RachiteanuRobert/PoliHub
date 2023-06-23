import React, { useState } from "react";
import { LaboratoryDTO } from "@infrastructure/apis/client/models/LaboratoryDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useLaboratoryTableController } from "./LaboratoryTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { LaboratoryAddDialog } from '../../Dialogs/LaboratoryDialog/LaboratoryAddDialog';
import { LaboratoryUpdateDialog } from "../../Dialogs/LaboratoryDialog/LaboratoryUpdateDialog";
import { setLaboratoryToUpdate } from "@application/state-slices/laboratory";
import { Laboratory } from "@application/state-slices/laboratory/laboratorySlice.types";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const useHeader = (): { key: keyof LaboratoryDTO; name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "assistantName", name: formatMessage({ id: "globals.assistantName" }) },
        { key: "startTime", name: formatMessage({ id: "globals.startTime" }) },
        { key: "duration", name: formatMessage({ id: "globals.duration" }) },
        { key: "location", name: formatMessage({ id: "globals.location" }) },
        { key: "dayOfWeek", name: formatMessage({ id: "globals.dayOfWeek" }) },
    ];
};

const getRowValues = (entries: LaboratoryDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

const formatValue = (value: any) => {
    if (value instanceof Date) {
        let day = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();
        return day + "/" + month + "/" + year;
    }

    return value;
}
export const LaboratoryTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const [search, setSearch] = useState("");
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useLaboratoryTableController(search);
    const rowValues = getRowValues(pagedData?.data, orderMap);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleOnDoubleClick = (entry: LaboratoryDTO) => {
        dispatch(setLaboratoryToUpdate(entry as Laboratory))
        setIsUpdate(true);}


    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <LaboratoryAddDialog />
        <p>
            <Input value={search} onChange={(e: any) => {
                setSearch(e.target.value);
                tryReload();
            }} />
            <SearchIcon />
        </p>

        <LaboratoryUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination
                component="div"
                count={pagedData.totalCount}
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0}
                onPageChange={handleChangePage}
                rowsPerPage={pagedData.pageSize}
                onRowsPerPageChange={handleChangePageSize}
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow onDoubleClick={() => handleOnDoubleClick(entry)} key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) =>
                                <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                    {formatValue(keyValue.value)}
                                </TableCell>)}
                            <TableCell>
                                {entry.id !== ownUserId && <IconButton color="error" onClick={() => remove(entry.id || '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>}
                            </TableCell>
                            <TableCell>

                                <Link to={`/laboratories/${entry.id}`}><InfoIcon />
                                </Link>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
}
