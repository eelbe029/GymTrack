import React, { useState } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

// --- Shared Logic ---
const InteractivePath = ({ name, d, onSelect }) => {
    const [hover, setHover] = useState(false);
    return (
        <Tooltip title={name} followCursor>
            <path
                d={d}
                fill={hover ? '#ff6b6b' : '#d2b48c'}
                stroke="#5e4b35"
                strokeWidth="1"
                style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    opacity: 0.9,
                    filter: hover ? 'brightness(1.1)' : 'none'
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => onSelect(name)}
            />
        </Tooltip>
    );
};

// --- Individual Muscle Components ---

const Chest = ({ onSelect }) => (
    <InteractivePath
        name="Chest"
        onSelect={onSelect}
        d={`
       M 150 100 
       C 150 100, 110 95, 100 85 
       C 70 95, 75 130, 85 145 
       C 100 155, 130 150, 150 145
       M 150 100
       C 150 100, 190 95, 200 85
       C 230 95, 225 130, 215 145
       C 200 155, 170 150, 150 145
       Z
    `}
    />
);

const Abs = ({ onSelect }) => (
    <InteractivePath
        name="Abs"
        onSelect={onSelect}
        d={`
       M 115 148 L 185 148 L 180 230 C 180 230, 150 240, 120 230 Z
       M 120 230 L 180 230 L 175 260 L 125 260 Z
    `}
    />
);

const Shoulders = ({ onSelect }) => (
    <InteractivePath
        name="Shoulders"
        onSelect={onSelect}
        d={`
       M 75 80 C 60 75, 40 90, 40 110 C 40 130, 55 140, 70 135 L 85 110 Z
       M 225 80 C 240 75, 260 90, 260 110 C 260 130, 245 140, 230 135 L 215 110 Z
    `}
    />
);

const Arms = ({ onSelect }) => (
    <InteractivePath
        name="Arms"
        onSelect={onSelect}
        d={`
       M 40 115 C 30 150, 25 180, 20 200 L 50 210 L 65 140 Z
       M 260 115 C 270 150, 275 180, 280 200 L 250 210 L 235 140 Z
    `}
    />
);

const Legs = ({ onSelect }) => (
    <InteractivePath
        name="Legs"
        onSelect={onSelect}
        d={`
       M 115 260 C 100 300, 100 350, 105 380 L 145 380 C 150 350, 150 300, 145 260 Z
       M 185 260 C 200 300, 200 350, 195 380 L 155 380 C 150 350, 150 300, 155 260 Z
    `}
    />
);

const BodyOutline = () => (
    <path
        d={`
      M 150 30 C 135 30, 130 45, 130 55 L 130 65 L 110 70 L 70 80 L 70 100 L 150 100 
      L 230 100 L 230 80 L 190 70 L 170 65 L 170 55 C 170 45, 165 30, 150 30 Z
    `}
        fill="#e0e0e0"
        stroke="none"
    />
);

// --- Main Composition ---

const MuscleMap = ({ onSelect }) => {
    return (
        <Box sx={{ position: 'relative', width: 300, height: 500, margin: 'auto' }}>
            <svg viewBox="0 0 300 500" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))' }}>
                <BodyOutline />
                <Shoulders onSelect={onSelect} />
                <Arms onSelect={onSelect} />
                <Chest onSelect={onSelect} />
                <Abs onSelect={onSelect} />
                <Legs onSelect={onSelect} />
            </svg>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                [ INTERACTIVE MAP: SELECT MUSCLE GROUP ]
            </Typography>
        </Box>
    );
};

export default MuscleMap;
