import React, { useState } from "react";
import { SubjectDTO } from "@infrastructure/apis/client/models/SubjectDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useSubjectTableController } from "./SubjectTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { SubjectAddDialog } from '../../Dialogs/SubjectDialog/SubjectAddDialog';
import { SubjectUpdateDialog } from "../../Dialogs/SubjectDialog/SubjectUpdateDialog";
import { setSubjectToUpdate } from "@application/state-slices/subject";
import { Subject } from "@application/state-slices/subject/subjectSlice.types";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import {Link} from 'react-router-dom'


const useHeader = (): { key: keyof SubjectDTO; name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "year", name: formatMessage({ id: "globals.year" }) },
        { key: "semester", name: formatMessage({ id: "globals.semester" }) },
        { key: "department", name: formatMessage({ id: "globals.department" }) },
        { key: "creditsNo", name: formatMessage({ id: "globals.creditsNo" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
    ];
};

const getRowValues = (entries: SubjectDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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
export const SubjectTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const [search, setSearch] = useState("");
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useSubjectTableController(search);
    const rowValues = getRowValues(pagedData?.data, orderMap);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleOnDoubleClick = (entry: SubjectDTO) => {
        dispatch(setSubjectToUpdate(entry as Subject))
        setIsUpdate(true);}


    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <SubjectAddDialog />
        <p>
        <Input value={search} onChange={(e: any) => {
            setSearch(e.target.value);
            tryReload();
        }} />
            <SearchIcon />
        </p>

        <SubjectUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
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
                                <Link to={`/subjects/${entry.id}`}><InfoIcon />
                                </Link>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
}
