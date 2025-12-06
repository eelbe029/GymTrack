import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Tabs, Tab, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = isLogin ? login(username, password) : signup(username, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default'
        }}>
            <Typography variant="h2" sx={{ mb: 4, letterSpacing: 4 }}>
                GYM<span style={{ color: '#888' }}>TRACK</span>_
            </Typography>

            <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 400, border: '1px solid #333' }}>
                <Tabs
                    value={isLogin ? 0 : 1}
                    onChange={(e, val) => {
                        setIsLogin(val === 0);
                        setError('');
                    }}
                    centered
                    sx={{ mb: 3 }}
                >
                    <Tab label="LOG IN" />
                    <Tab label="SIGN UP" />
                </Tabs>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        {isLogin ? '> ENTER SYSTEM' : '> CREATE USER'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AuthPage;
