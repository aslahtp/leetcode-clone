import React from 'react';

const DifficultyBadge = ({ difficulty }) => {
    const getDifficultyColor = (diff) => {
        switch (diff?.toLowerCase()) {
            case 'easy': return 'badge-easy';
            case 'medium': return 'badge-medium';
            case 'hard': return 'badge-hard';
            default: return 'badge-easy';
        }
    };

    return (
        <span className={`badge ${getDifficultyColor(difficulty)}`}>
            {difficulty}
        </span>
    );
};

export default DifficultyBadge; 