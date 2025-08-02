import React from 'react';
import DifficultyBadge from './DifficultyBadge';
import MarkdownRenderer from './MarkdownRenderer';
import ExamplesSection from './ExamplesSection';
import ConstraintsSection from './ConstraintsSection';

const QuestionDescription = ({ title, description, difficulty }) => {
    return (
        <div className="question-description h-full flex flex-col">
            <div className="question-description-header">
                <div className="space-y-4">
                    {/* Title Section - Multi-line */}
                    <div className="flex items-start justify-between">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight break-words flex-1">{title}</h1>
                    </div>

                    {/* Meta Information Section - Below Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Difficulty Badge */}
                        <div className="flex items-center">
                            <DifficultyBadge difficulty={difficulty} />
                        </div>

                        {/* Stats Section */}
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="whitespace-nowrap">85% Acceptance</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="whitespace-nowrap">2.1M Submissions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="question-description-body">
                <div className="space-y-8">
                    {/* Description Section */}
                    <section className="fade-in">
                        <MarkdownRenderer content={description} />
                    </section>

                    {/* Examples Section */}
                    <section className="fade-in">
                        <ExamplesSection />
                    </section>

                    {/* Constraints Section */}
                    <section className="fade-in">
                        <ConstraintsSection />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default QuestionDescription; 