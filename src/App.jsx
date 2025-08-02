import React, { useState, useRef } from "react";
import Header from "./components/Header";
import QuestionDescription from "./components/QuestionDescription";
import CodeEditor from "./components/CodeEditor";
import OutputSection from "./components/OutputSection";
import { useQuestion } from "./hooks/useQuestion";
import { useCodeExecution } from "./hooks/useCodeExecution";

function App() {
  const [code, setCode] = useState(`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    // Example solution:
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
};`);

  // Ref for scrolling to output section
  const outputRef = useRef(null);

  // Custom hooks
  const { title, description, difficulty, loading: questionLoading, error: questionError } = useQuestion(1);
  const { output, isSuccess, isLoading, resultDetails, executeCode } = useCodeExecution();

  const scrollToOutput = () => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      // Add highlight animation
      outputRef.current.classList.add('highlight-output');
      setTimeout(() => {
        outputRef.current?.classList.remove('highlight-output');
      }, 1000);
    }
  };

  const handleRun = async () => {
    await executeCode(code, 1);
    // Small delay to ensure the output section is rendered
    setTimeout(scrollToOutput, 100);
  };

  const handleSubmit = async () => {
    await executeCode(code, 1);
    // Small delay to ensure the output section is rendered
    setTimeout(scrollToOutput, 100);
  };

  if (questionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-display flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading question...</p>
        </div>
      </div>
    );
  }

  if (questionError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-display flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Error loading question</p>
          <p className="text-sm text-gray-500 mt-1">{questionError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-display">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Panel - Problem Description */}
          <QuestionDescription
            title={title}
            description={description}
            difficulty={difficulty}
          />

          {/* Right Panel - Code Editor */}
          <CodeEditor
            code={code}
            setCode={setCode}
            isLoading={isLoading}
            onRun={handleRun}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Output Section */}
        <OutputSection
          ref={outputRef}
          output={output}
          isLoading={isLoading}
          isSuccess={isSuccess}
          resultDetails={resultDetails}
        />
      </div>
    </div>
  );
}

export default App;