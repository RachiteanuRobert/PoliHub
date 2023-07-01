import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import { useLaboratoryApi } from "@infrastructure/apis/api-management";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ComponentProps {
    laboratoryUserId: string;
    onDeleteButtonPress: () => void;
    children?: React.ReactNode;
}

const DeleteLaboratoryUserButton: React.FC<ComponentProps> = ({ laboratoryUserId, onDeleteButtonPress, children }) => {
    const { deleteLaboratoryUser } = useLaboratoryApi();

    const handleDeleteUser = () => {
        deleteLaboratoryUser.mutation(laboratoryUserId);
        onDeleteButtonPress();
    };

    return (
        <IconButton color="error" onClick={handleDeleteUser}>
            <DeleteIcon color="error" fontSize="small" />
        </IconButton>
    );
};

export default DeleteLaboratoryUserButton;
