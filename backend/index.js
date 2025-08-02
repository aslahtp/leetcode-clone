/* eslint-disable no-undef */
const express = require("express");
const { VM } = require("vm2");
const questions = require("./src/questions");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.get("/questions/:id", (req, res) => {
    const questionId = parseInt(req.params.id);
    const question = questions.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }

    res.json({
        title: question.title,
        description: question.description,
    });
});

app.post("/submit/:id", (req, res) => {
    const { code } = req.body;
    const questionId = parseInt(req.params.id);

    // Validate question exists
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({
            success: false,
            error: "Question not found"
        });
    }

    // Validate code is provided
    if (!code || typeof code !== 'string') {
        return res.status(400).json({
            success: false,
            error: "Code is required and must be a string"
        });
    }

    const results = [];
    let allPassed = true;

    // Run all test cases
    for (let i = 0; i < question.testCases.length; i++) {
        const testCase = question.testCases[i];
        const input = eval('(' + testCase.input + ')');
        const expectedOutput = JSON.parse(testCase.output);

        const vm = new VM({
            timeout: 2000,
            sandbox: {
                input: input,
                console: {
                    log: () => { },
                    error: () => { },
                    warn: () => { }
                }
            }
        });

        try {
            const script = `
                ${code}
                const result = twoSum(input.nums, input.target);
                result;
            `;
            const result = vm.run(script);

            // Normalize arrays for comparison (sort if order doesn't matter for this problem)
            const normalizeArray = (arr) => {
                if (Array.isArray(arr)) {
                    return arr.sort((a, b) => a - b);
                }
                return arr;
            };

            const normalizedResult = normalizeArray(result);
            const normalizedExpected = normalizeArray(expectedOutput);

            const isCorrect = JSON.stringify(normalizedResult) === JSON.stringify(normalizedExpected);

            results.push({
                testCase: i + 1,
                input: input,
                result: result,
                expected: expectedOutput,
                passed: isCorrect
            });

            if (!isCorrect) {
                allPassed = false;
            }

        } catch (error) {
            results.push({
                testCase: i + 1,
                input: input,
                error: error.message,
                passed: false
            });
            allPassed = false;
        }
    }

    if (allPassed) {
        res.json({
            success: true,
            results: results,
            message: `All ${question.testCases.length} test cases passed! 🎉`
        });
    } else {
        res.json({
            success: false,
            results: results,
            message: `${results.filter(r => !r.passed).length} out of ${question.testCases.length} test cases failed.`
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});