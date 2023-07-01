import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import { useLaboratoryApi } from "@infrastructure/apis/api-management";
import './AddUserButton.css'; // Import custom CSS file

interface ComponentProps {
    laboratoryId: string;
    onAddButtonPress: () => void;
    children?: React.ReactNode;
}

const AddLaboratoryUserButton: React.FC<ComponentProps> = ({ laboratoryId, onAddButtonPress, children }) => {
    const [userId, setUserId] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { formatMessage } = useIntl();
    const { addLaboratoryUser } = useLaboratoryApi();

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const handleAddUser = () => {
        const userLaboratoryIds = { laboratoryId, userId };
        addLaboratoryUser.mutation(userLaboratoryIds);
        onAddButtonPress();
        setUserId('');
        setIsPopupOpen(false);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="add-laboratory-user-container">
            <Button
                variant="contained"
                className="add-button"
                onClick={handleOpenPopup}
                style={{ color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#024180'}}
            >
                Adauga Student
            </Button>
            {isPopupOpen && (
                <>
                    <div className="overlay" onClick={handleClosePopup} />
                    <div className="popup-container">
                        <input
                            type="text"
                            value={userId}
                            onChange={handleUserIdChange}
                            className="transparent-input"
                            placeholder="Introdu ID Student"
                            style={{ marginBottom: '20px', marginRight: '20px' }}
                        />
                        <Button
                            variant="outlined"
                            className="submit-button"
                            onClick={handleAddUser}
                            style={{ color: '#FFFFFF', background: '#024180' }}
                        >
                            Trimite
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddLaboratoryUserButton;
