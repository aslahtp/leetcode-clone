import React from 'react';

const ConstraintsSection = () => {
    const constraints = [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists"
    ];

    return (
        <div>
            <div className="flex items-center mb-6">
                <svg className="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">Constraints</h2>
            </div>

            <div className="constraints-section">
                <div className="constraints-list">
                    {constraints.map((constraint, index) => (
                        <div key={index} className="constraint-item">
                            <div className="constraint-bullet"></div>
                            <div className="constraint-text">{constraint}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-gray-900">Follow-up</span>
                </div>
                <p className="text-gray-700 text-sm">
                    Can you come up with an algorithm that is less than O(n²) time complexity?
                </p>
            </div>
        </div>
    );
};

export default ConstraintsSection; 