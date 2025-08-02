import React from 'react';

const ExamplesTab = () => {
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
        <div className="fade-in">
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

export default ExamplesTab; 