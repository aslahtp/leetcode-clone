import axios from "axios";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Editor } from "@monaco-editor/react";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultDetails, setResultDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/questions/1")
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((err) => {
        console.log(err);
        setTitle("Error loading question");
        setDescription("Failed to fetch the question. Please check the server status.");
      });
  }, []);

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code before running.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setOutput("");
    setResultDetails(null);

    try {
      const res = await axios.post("http://localhost:3000/submit/1", {
        code: code
      });

      const { success, results, message } = res.data;

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
      console.log(err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "An unknown error occurred.";
      setOutput(`❌ ${errorMessage}`);
      setIsSuccess(false);
      setResultDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => runCode();
  const handleRun = () => runCode();

  return (
    <div className="bg-[#C9D6DF] min-h-screen w-screen max-w-screen-2xl mx-auto p-4 flex flex-col">
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 w-80 m-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          LeetCode Clone
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-grow gap-4">
        <div className="bg-[#ffffff] flex-1 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
          <div className="text-black text-left markdown-body">
            <Markdown>{description}</Markdown>
          </div>
        </div>

        <div className="bg-[#ffffff] flex-1 p-4 flex flex-col rounded-lg">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleRun}
              disabled={isLoading}
              className={`flex-1 p-2 rounded-md transition-colors ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
              {isLoading ? 'Running...' : 'Run'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex-1 p-2 rounded-md transition-colors ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
              {isLoading ? 'Running...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Output section */}
      {(output || isLoading) && (
        <div className="bg-[#ffffff] h-1/3 w-full mt-4 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Output</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">Running your code...</span>
            </div>
          ) : (
            <>
              <div className={`text-xl font-semibold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? "Success" : "Error"}
              </div>
              <div className="text-gray-600 font-mono whitespace-pre-wrap">{output}</div>

              {/* Additional result details */}
              {resultDetails && resultDetails.results && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-semibold mb-2">Test Case Details:</h4>
                  <div className="space-y-3">
                    {resultDetails.results.map((test, index) => (
                      <div key={index} className={`p-3 rounded border ${test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Test Case {test.testCase}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${test.passed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {test.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Input:</span>
                            <pre className="bg-white p-2 rounded border mt-1 overflow-x-auto text-xs">
                              {JSON.stringify(test.input, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <span className="font-medium">Output:</span>
                            <pre className="bg-white p-2 rounded border mt-1 overflow-x-auto text-xs">
                              {test.error ? test.error : JSON.stringify(test.result, null, 2)}
                            </pre>
                          </div>
                          {!test.passed && !test.error && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Expected:</span>
                              <pre className="bg-white p-2 rounded border mt-1 overflow-x-auto text-xs">
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;