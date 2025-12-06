import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import MainMenu from './pages/MainMenu';
import ExercisesPage from './pages/ExercisesPage';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <Routes>
                        <Route path="/auth" element={<AuthPage />} />
                        <Route element={<Layout />}>
                            <Route path="/" element={<MainMenu />} />
                            <Route path="/exercises/:muscle" element={<ExercisesPage />} />
                        </Route>
                    </Routes>
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
