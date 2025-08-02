import React from 'react';

const ExamplesSection = () => {
    const examples = [
        {
            id: 1,
            title: "Example 1",
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            id: 2,
            title: "Example 2",
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]"
        },
        {
            id: 3,
            title: "Example 3",
            input: "nums = [3,3], target = 6",
            output: "[0,1]"
        }
    ];

    return (
        <div>
            <div className="flex items-center mb-6">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">Examples</h2>
            </div>

            <div className="examples-grid">
                {examples.map((example) => (
                    <div key={example.id} className="example-card">
                        <div className="example-card-header">
                            <span className="example-card-title">{example.title}</span>
                            <span className="example-card-number">Test Case</span>
                        </div>
                        <div className="example-card-content">
                            <div className="example-input-output">
                                <div>
                                    <div className="example-label">Input</div>
                                    <div className="example-value">{example.input}</div>
                                </div>
                                <div>
                                    <div className="example-label">Output</div>
                                    <div className="example-value">{example.output}</div>
                                </div>
                            </div>
                            {example.explanation && (
                                <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                                    <div className="text-sm text-blue-800">
                                        <strong>Explanation:</strong> {example.explanation}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamplesSection; 