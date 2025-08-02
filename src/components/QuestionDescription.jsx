import React from 'react';
import DifficultyBadge from './DifficultyBadge';
import DescriptionTabs from './DescriptionTabs';
import MarkdownRenderer from './MarkdownRenderer';
import ExamplesTab from './ExamplesTab';
import ConstraintsTab from './ConstraintsTab';

const QuestionDescription = ({ title, description, difficulty, activeTab, setActiveTab }) => {
    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return <MarkdownRenderer content={description} />;
            case "examples":
                return <ExamplesTab />;
            case "constraints":
                return <ConstraintsTab />;
            default:
                return <MarkdownRenderer content={description} />;
        }
    };

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
                <DescriptionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {renderTabContent()}
            </div>
        </div>
    );
};

export default QuestionDescription; 