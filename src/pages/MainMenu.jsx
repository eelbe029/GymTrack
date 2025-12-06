import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuscleMap from '../components/MuscleMap';
import { useAuth } from '../context/AuthContext';

const MainMenu = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleMuscleSelect = (muscleName) => {
        navigate(`/exercises/${muscleName.toLowerCase()}`);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Please select a muscle group
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Hello {user?.username}. Click on a muscle group to view or add exercises.
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 4, display: 'inline-block', border: '1px dashed #ccc', bgcolor: 'transparent' }}>
                <MuscleMap onSelect={handleMuscleSelect} />
            </Paper>
        </Box>
    );
};

export default MainMenu;
