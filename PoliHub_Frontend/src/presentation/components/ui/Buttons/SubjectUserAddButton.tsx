import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import { useSubjectApi } from "@infrastructure/apis/api-management";
import './AddSubjectUserButton.css'; // Import custom CSS file

interface ComponentProps {
    subjectId: string;
    onAddButtonPress: () => void;
    children?: React.ReactNode;
}

const AddSubjectUserButton: React.FC<ComponentProps> = ({ subjectId, onAddButtonPress, children }) => {
    const [userId, setUserId] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { formatMessage } = useIntl();
    const { addSubjectUser } = useSubjectApi();

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const handleAddUser = () => {
        const userSubjectIds = { subjectId, userId };
        addSubjectUser.mutation(userSubjectIds);
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
        <div className="add-subject-user-container">
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
                            style={{ color: '#1976d2', borderColor: '#1976d2', backgroundColor: 'transparent' }}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddSubjectUserButton;
