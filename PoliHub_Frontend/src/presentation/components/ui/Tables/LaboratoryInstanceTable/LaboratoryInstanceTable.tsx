import React, { useState } from "react";
import { LaboratoryInstanceDTO } from "@infrastructure/apis/client/models/LaboratoryInstanceDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useLaboratoryInstanceTableController } from "./LaboratoryInstanceTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { LaboratoryInstanceAddDialog } from '../../Dialogs/LaboratoryInstanceDialog/LaboratoryInstanceAddDialog';
import { LaboratoryInstanceUpdateDialog } from "../../Dialogs/LaboratoryInstanceDialog/LaboratoryInstanceUpdateDialog";
import { setLaboratoryInstanceToUpdate } from "@application/state-slices/laboratoryInstance";
import { LaboratoryInstance } from "@application/state-slices/laboratoryInstance/laboratoryInstanceSlice.types";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const useHeader = (): { key: keyof LaboratoryInstanceDTO; name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "laboratoryId", name: formatMessage({ id: "globals.laboratoryId" }) },
        { key: "laboratoryInstanceDate", name: formatMessage({ id: "globals.laboratoryInstanceDate" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
        { key: "name", name: formatMessage({ id: "globals.name" }) },
    ];
};

const getRowValues = (entries: LaboratoryInstanceDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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
export const LaboratoryInstanceTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const [search, setSearch] = useState("");
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useLaboratoryInstanceTableController(search);
    const rowValues = getRowValues(pagedData?.data, orderMap);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleOnDoubleClick = (entry: LaboratoryInstanceDTO) => {
        dispatch(setLaboratoryInstanceToUpdate(entry as LaboratoryInstance))
        setIsUpdate(true);}


    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <LaboratoryInstanceAddDialog laboratoryId ="" onAddButtonPress={() => {}} />
        <p>
            <Input value={search} onChange={(e: any) => {
                setSearch(e.target.value);
                tryReload();
            }} />
            <SearchIcon />
        </p>

        <LaboratoryInstanceUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
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
                    <TableRow sx={{ backgroundColor: "#024180" }}>
                        {header.map(e => <TableCell sx={{color: "#FFFFFF"}} key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}>{formatMessage({ id: "labels.actions" })}</TableCell>
                        <TableCell sx={{ backgroundColor: "#024180", color:"#FFFFFF"}}></TableCell>
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
                                <Link to={`/laboratoryInstances/${entry.id}`}><InfoIcon />
                                </Link>
                            </TableCell>
                            <TableCell>
                                {entry.id !== ownUserId && <IconButton color="error" onClick={() => remove(entry.id || '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
}
