import React, { useState, useEffect, useRef } from 'react';
import DifficultyBadge from './DifficultyBadge';

const QuestionSelector = ({ questions, currentQuestionId, onQuestionChange, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="flex items-center space-x-3 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
                    <div className="spinner w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 font-medium">Loading questions...</span>
                </div>
            </div>
        );
    }

    const currentQuestion = questions.find(q => q.id === currentQuestionId);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setFocusedIndex(prev => Math.min(prev + 1, questions.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setFocusedIndex(prev => Math.max(prev - 1, -1));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < questions.length) {
                        onQuestionChange(questions[focusedIndex].id);
                        setIsOpen(false);
                        setFocusedIndex(-1);
                    }
                    break;
                case 'Escape':
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, focusedIndex, questions, onQuestionChange]);

    return (
        <div className="relative">
            {/* Compact Question Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                            <span className="text-white font-bold text-xs">{currentQuestionId}</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-0">
                            <span className="text-sm font-medium text-gray-700 truncate">Problem {currentQuestionId}</span>
                            {currentQuestion && (
                                <DifficultyBadge difficulty={currentQuestion.difficulty} size="small" />
                            )}
                        </div>
                    </div>

                    {/* Question Selector Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <span className="text-gray-700">Change</span>
                            <svg
                                className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto question-selector-dropdown"
                            >
                                <div className="p-3 border-b border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900">Select a Problem</h3>
                                    <p className="text-xs text-gray-500 mt-1">Choose from our collection of coding challenges</p>
                                </div>
                                <div className="py-2">
                                    {questions.map((question, index) => (
                                        <button
                                            key={question.id}
                                            onClick={() => {
                                                onQuestionChange(question.id);
                                                setIsOpen(false);
                                                setFocusedIndex(-1);
                                                // Add a subtle success feedback
                                                const button = event.target.closest('button');
                                                if (button) {
                                                    button.style.transform = 'scale(0.95)';
                                                    setTimeout(() => {
                                                        button.style.transform = '';
                                                    }, 150);
                                                }
                                            }}
                                            onMouseEnter={() => setFocusedIndex(index)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left question-item ${question.id === currentQuestionId ? 'active' : 'hover:bg-gray-50'
                                                } ${focusedIndex === index ? 'bg-blue-50' : ''}`}
                                            tabIndex={-1}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 ${question.id === currentQuestionId
                                                ? 'bg-blue-500 text-white shadow-md scale-105'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}>
                                                {question.id}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-sm font-medium truncate ${question.id === currentQuestionId ? 'text-blue-900' : 'text-gray-900'
                                                        }`}>
                                                        {question.title}
                                                    </span>
                                                    <DifficultyBadge difficulty={question.difficulty} size="small" />
                                                </div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-xs text-gray-500">
                                                        {question.difficulty} • Problem {question.id}
                                                    </span>
                                                </div>
                                            </div>
                                            {question.id === currentQuestionId && (
                                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default QuestionSelector; 