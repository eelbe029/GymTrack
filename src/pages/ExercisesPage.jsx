import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Grid, Paper, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, InputAdornment, Card, CardMedia, CardContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useData } from '../context/DataContext';

const ExercisesPage = () => {
    const { muscle } = useParams();
    const navigate = useNavigate();
    const { getExercisesByMuscle, addExercise } = useData();
    const exercises = getExercisesByMuscle(muscle);

    const [open, setOpen] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: '', variety: '', weight: '', image: '' });

    const handleCreate = () => {
        if (newExercise.name) {
            addExercise(muscle, newExercise);
            setOpen(false);
            setNewExercise({ name: '', variety: '', weight: '', image: '' });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewExercise({ ...newExercise, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ mb: 3 }}
            >
                BACK TO MAP
            </Button>

            <Typography variant="h4" sx={{ mb: 4, textTransform: 'uppercase' }}>
                / {muscle} / EXERCISES
            </Typography>

            <Grid container spacing={3}>
                {exercises.map((ex) => (
                    <Grid item xs={12} sm={6} md={4} key={ex.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }} elevation={0}>
                            <Box sx={{ height: 200, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {ex.image ? (
                                    <img src={ex.image} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Typography variant="caption" color="text.secondary">NO IMAGE</Typography>
                                )}
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>{ex.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Variety: {ex.variety || '-'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Last Weight: {ex.weight} kg
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Add Button Block */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={0}
                        onClick={() => setOpen(true)}
                        sx={{
                            height: '100%',
                            minHeight: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #999',
                            cursor: 'pointer',
                            bgcolor: 'transparent',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                        }}
                    >
                        <AddIcon sx={{ fontSize: 60, color: '#999' }} />
                    </Paper>
                </Grid>
            </Grid>

            {/* Add Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontFamily: 'monospace' }}>// NEW EXERCISE</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ height: 100, borderStyle: 'dashed' }}
                        >
                            {newExercise.image ? 'IMAGE SELECTED' : 'UPLOAD IMAGE'}
                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                        </Button>

                        <TextField
                            label="Exercise Name"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Variety / Notes"
                            value={newExercise.variety}
                            onChange={(e) => setNewExercise({ ...newExercise, variety: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Default Weight"
                            type="number"
                            value={newExercise.weight}
                            onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)} color="inherit">CANCEL</Button>
                    <Button onClick={handleCreate} variant="contained" color="primary">SAVE EXERCISE</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ExercisesPage;
