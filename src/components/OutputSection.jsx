import React, { forwardRef } from 'react';

const OutputSection = forwardRef(({ output, isLoading, isSuccess, resultDetails }, ref) => {
  if (!output && !isLoading) return null;

  return (
    <div ref={ref} className="mt-6 card slide-in">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Output</h3>
          <div className="flex items-center space-x-2">
            {isSuccess && (
              <span className="badge badge-easy">Success</span>
            )}
            {!isSuccess && output && (
              <span className="badge badge-hard">Error</span>
            )}
          </div>
        </div>
      </div>

      <div className="card-body">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="spinner w-8 h-8 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Running your code...</p>
              <p className="text-sm text-gray-500 mt-1">Please wait while we execute your solution</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${isSuccess
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
              }`}>
              <div className="flex items-center space-x-2 mb-2">
                {isSuccess ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="font-semibold">
                  {isSuccess ? "Success!" : "Error"}
                </span>
              </div>
              <div className="font-mono text-sm whitespace-pre-wrap">{output}</div>
            </div>

            {/* Test Case Details */}
            {resultDetails && resultDetails.results && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Test Case Results</h4>
                <div className="grid gap-3">
                  {resultDetails.results.map((test, index) => (
                    <div key={index} className={`test-case ${test.passed ? 'passed' : 'failed'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Test Case {test.testCase}</span>
                        <span className={`badge ${test.passed ? 'badge-easy' : 'badge-hard'}`}>
                          {test.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Input:</span>
                          <pre className="mt-1 p-3 bg-gray-50 rounded border font-mono text-xs overflow-x-auto">
                            {JSON.stringify(test.input, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Output:</span>
                          <pre className="mt-1 p-3 bg-gray-50 rounded border font-mono text-xs overflow-x-auto">
                            {test.error ? test.error : JSON.stringify(test.result, null, 2)}
                          </pre>
                        </div>
                        {!test.passed && !test.error && (
                          <div className="md:col-span-2">
                            <span className="text-sm font-medium text-gray-700">Expected:</span>
                            <pre className="mt-1 p-3 bg-gray-50 rounded border font-mono text-xs overflow-x-auto">
                              {JSON.stringify(test.expected, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

OutputSection.displayName = 'OutputSection';

export default OutputSection; 