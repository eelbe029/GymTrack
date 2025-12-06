import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('gymtrack_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Simulated login: Check against 'gymtrack_users_db' in localStorage
        const usersDb = JSON.parse(localStorage.getItem('gymtrack_users_db') || '[]');
        const foundUser = usersDb.find(u => u.username === username && u.password === password);

        if (foundUser) {
            const userSession = { username: foundUser.username };
            localStorage.setItem('gymtrack_user', JSON.stringify(userSession));
            setUser(userSession);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (username, password) => {
        const usersDb = JSON.parse(localStorage.getItem('gymtrack_users_db') || '[]');
        if (usersDb.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        usersDb.push({ username, password });
        localStorage.setItem('gymtrack_users_db', JSON.stringify(usersDb));

        // Auto login after signup
        const userSession = { username };
        localStorage.setItem('gymtrack_user', JSON.stringify(userSession));
        setUser(userSession);
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('gymtrack_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
