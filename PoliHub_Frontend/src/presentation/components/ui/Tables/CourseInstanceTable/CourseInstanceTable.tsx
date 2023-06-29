import React, { useState } from "react";
import { CourseInstanceDTO } from "@infrastructure/apis/client/models/CourseInstanceDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useCourseInstanceTableController } from "./CourseInstanceTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CourseInstanceAddDialog } from '../../Dialogs/CourseInstanceDialog/CourseInstanceAddDialog';
import { CourseInstanceUpdateDialog } from "../../Dialogs/CourseInstanceDialog/CourseInstanceUpdateDialog";
import { setCourseInstanceToUpdate } from "@application/state-slices/courseInstance";
import { CourseInstance } from "@application/state-slices/courseInstance/courseInstanceSlice.types";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";

const useHeader = (): { key: keyof CourseInstanceDTO; name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "courseId", name: formatMessage({ id: "globals.courseId" }) },
        { key: "courseInstanceDate", name: formatMessage({ id: "globals.courseInstanceDate" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
        { key: "name", name: formatMessage({ id: "globals.name" }) },
    ];
};

const getRowValues = (entries: CourseInstanceDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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
export const CourseInstanceTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const [search, setSearch] = useState("");
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useCourseInstanceTableController(search);
    const rowValues = getRowValues(pagedData?.data, orderMap);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleOnDoubleClick = (entry: CourseInstanceDTO) => {
        dispatch(setCourseInstanceToUpdate(entry as CourseInstance))
        setIsUpdate(true);}


    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <CourseInstanceAddDialog courseId =""/>
        <p>
            <Input value={search} onChange={(e: any) => {
                setSearch(e.target.value);
                tryReload();
            }} />
            <SearchIcon />
        </p>

        <CourseInstanceUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
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
                                <Link to={`/courseInstances/${entry.id}`}>Info
                                </Link>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
}
