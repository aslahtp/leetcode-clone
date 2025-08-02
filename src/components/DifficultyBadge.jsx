import React from 'react';

const DifficultyBadge = ({ difficulty, size = 'normal' }) => {
    const getDifficultyConfig = (diff) => {
        const config = {
            easy: {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: '🟢',
                label: 'Easy'
            },
            medium: {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: '🟡',
                label: 'Medium'
            },
            hard: {
                color: 'bg-red-100 text-red-800 border-red-200',
                icon: '🔴',
                label: 'Hard'
            }
        };

        const key = diff?.toLowerCase() || 'easy';
        return config[key] || config.easy;
    };

    const config = getDifficultyConfig(difficulty);
    const sizeClasses = size === 'small'
        ? 'px-2 py-0.5 text-xs'
        : 'px-2.5 py-1 text-xs';

    return (
        <span className={`inline-flex items-center space-x-1 rounded-full font-medium border ${config.color} ${sizeClasses}`}>
            <span className="text-xs">{config.icon}</span>
            <span>{config.label}</span>
        </span>
    );
};

export default DifficultyBadge; 