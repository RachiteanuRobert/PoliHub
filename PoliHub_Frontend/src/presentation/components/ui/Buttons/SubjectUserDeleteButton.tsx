import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import { useSubjectApi } from "@infrastructure/apis/api-management";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ComponentProps {
    subjectUserId: string;
    onDeleteButtonPress: () => void;
    children?: React.ReactNode;
}

const DeleteSubjectUserButton: React.FC<ComponentProps> = ({ subjectUserId, onDeleteButtonPress, children }) => {
    const { deleteSubjectUser } = useSubjectApi();

    const handleDeleteUser = () => {
        deleteSubjectUser.mutation(subjectUserId);
        onDeleteButtonPress();
    };

    return (
        <IconButton color="error" onClick={handleDeleteUser}>
            <DeleteIcon color="error" fontSize="small" />
        </IconButton>
    );
};

export default DeleteSubjectUserButton;
