import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Layout = () => {
    const { user, logout } = useAuth();
    const { exportData, importData } = useData();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            importData(file).then(() => {
                alert('Data imported successfully!');
                window.location.reload();
            }).catch(err => {
                alert('Import failed: ' + err.message);
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #ddd' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        GYM<span style={{ color: '#888' }}>TRACK</span>_
                    </Typography>

                    {user && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                                USER: {user.username}
                            </Typography>

                            <Button
                                startIcon={<FileDownloadIcon />}
                                onClick={exportData}
                                size="small"
                                variant="outlined"
                            >
                                EXPORT
                            </Button>

                            <Button
                                component="label"
                                startIcon={<FileUploadIcon />}
                                size="small"
                                variant="outlined"
                            >
                                IMPORT
                                <input
                                    type="file"
                                    hidden
                                    accept=".json"
                                    onChange={handleImport}
                                />
                            </Button>

                            <Button color="error" onClick={handleLogout} variant="text" sx={{ ml: 2 }}>
                                [ LOGOUT ]
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Outlet />
            </Container>

            <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid #ddd' }}>
                <Typography variant="caption">
          // DEVELOPED FOR PERSONAL TRACKING
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;
