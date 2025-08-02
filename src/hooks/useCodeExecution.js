import { useState } from 'react';
import axios from 'axios';

export const useCodeExecution = () => {
    const [output, setOutput] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resultDetails, setResultDetails] = useState(null);

    const executeCode = async (code, questionId = 1) => {
        if (!code.trim()) {
            setOutput("Please enter some code before running.");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setOutput("");
        setResultDetails(null);

        try {
            const response = await axios.post(`http://localhost:3000/submit/${questionId}`, {
                code: code
            });

            const { success, results, message } = response.data;

            setIsSuccess(success);
            setResultDetails({
                results: results,
                message: message
            });

            if (success) {
                setOutput(`✅ ${message}`);
            } else {
                const failedTests = results.filter(r => !r.passed);
                setOutput(`❌ ${message}\n\nFailed test cases:\n${failedTests.map(test =>
                    `Test ${test.testCase}: Expected ${JSON.stringify(test.expected)}, got ${JSON.stringify(test.result || test.error)}`
                ).join('\n')}`);
            }
        } catch (err) {
            console.error('Error executing code:', err);
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "An unknown error occurred.";
            setOutput(`❌ ${errorMessage}`);
            setIsSuccess(false);
            setResultDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    const resetOutput = () => {
        setOutput("");
        setIsSuccess(false);
        setResultDetails(null);
    };

    return {
        output,
        isSuccess,
        isLoading,
        resultDetails,
        executeCode,
        resetOutput
    };
}; 