import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import { useCourseApi } from "@infrastructure/apis/api-management";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ComponentProps {
    courseUserId: string;
    onDeleteButtonPress: () => void;
    children?: React.ReactNode;
}

const DeleteCourseUserButton: React.FC<ComponentProps> = ({ courseUserId, onDeleteButtonPress, children }) => {
    const { deleteCourseUser } = useCourseApi();

    const handleDeleteUser = () => {
        deleteCourseUser.mutation(courseUserId);
        onDeleteButtonPress();
    };

    return (
        <IconButton color="error" onClick={handleDeleteUser}>
            <DeleteIcon color="error" fontSize="small" />
        </IconButton>
    );
};

export default DeleteCourseUserButton;
