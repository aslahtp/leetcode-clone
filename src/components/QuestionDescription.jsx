import React from 'react';
import DifficultyBadge from './DifficultyBadge';
import MarkdownRenderer from './MarkdownRenderer';
import ExamplesSection from './ExamplesSection';
import ConstraintsSection from './ConstraintsSection';

const QuestionDescription = ({ title, description, difficulty }) => {
    return (
        <div className="question-description h-full flex flex-col">
            <div className="question-description-header">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <DifficultyBadge difficulty={difficulty} />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Acceptance Rate: 85%</span>
                        <span>•</span>
                        <span>Submissions: 2.1M</span>
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