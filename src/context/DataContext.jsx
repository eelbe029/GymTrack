import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [exercises, setExercises] = useState({});

    // Load data when user changes
    useEffect(() => {
        if (user) {
            const storedData = localStorage.getItem(`gymtrack_data_${user.username}`);
            if (storedData) {
                setExercises(JSON.parse(storedData));
            } else {
                setExercises({});
            }
        } else {
            setExercises({});
        }
    }, [user]);

    // Save data whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(`gymtrack_data_${user.username}`, JSON.stringify(exercises));
        }
    }, [exercises, user]);

    const addExercise = (muscleGroup, exercise) => {
        setExercises(prev => {
            const group = prev[muscleGroup] || [];
            return {
                ...prev,
                [muscleGroup]: [...group, { ...exercise, id: Date.now() }]
            };
        });
    };

    const getExercisesByMuscle = (muscleGroup) => {
        return exercises[muscleGroup] || [];
    };

    const exportData = () => {
        if (!user) return;
        const data = {
            user: user.username,
            timestamp: new Date().toISOString(),
            exercises: exercises
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gymtrack_backup_${user.username}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importData = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.exercises) {
                        setExercises(data.exercises);
                        resolve({ success: true });
                    } else {
                        reject({ success: false, message: 'Invalid data format' });
                    }
                } catch (error) {
                    reject({ success: false, message: 'Parse error' });
                }
            };
            reader.readAsText(file);
        });
    };

    return (
        <DataContext.Provider value={{ exercises, addExercise, getExercisesByMuscle, exportData, importData }}>
            {children}
        </DataContext.Provider>
    );
};
