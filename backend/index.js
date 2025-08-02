/* eslint-disable no-undef */
const express = require("express");
const { VM } = require("vm2");
const questions = require("./src/questions");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());


app.get("/questions", (req, res) => {
    const questionList = questions.map(q => ({
        id: q.id,
        title: q.title,
        difficulty: q.difficulty
    }));
    res.json(questionList);
});

app.get("/questions/:id", (req, res) => {
    const questionId = parseInt(req.params.id);
    const question = questions.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }

    res.json({
        title: question.title,
        description: question.description,
        difficulty: question.difficulty,
        defaultCode: question.jsCode
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

        // Create ListNode constructor for question 2
        const ListNode = function (val, next) {
            this.val = (val === undefined ? 0 : val);
            this.next = (next === undefined ? null : next);
        };

        // Helper function to create linked list from array
        const createLinkedList = (arr) => {
            if (!arr || arr.length === 0) return null;
            const head = new ListNode(arr[0]);
            let current = head;
            for (let i = 1; i < arr.length; i++) {
                current.next = new ListNode(arr[i]);
                current = current.next;
            }
            return head;
        };

        // Helper function to convert linked list to array
        const linkedListToArray = (head) => {
            const result = [];
            let current = head;
            while (current) {
                result.push(current.val);
                current = current.next;
            }
            return result;
        };

        const vm = new VM({
            timeout: 2000,
            sandbox: {
                input: input,
                ListNode: ListNode,
                createLinkedList: createLinkedList,
                linkedListToArray: linkedListToArray,
                console: {
                    log: () => { },
                    error: () => { },
                    warn: () => { }
                }
            }
        });

        try {
            // Determine the function name based on the question
            let functionCall = '';
            if (questionId === 1) {
                functionCall = 'twoSum(input.nums, input.target)';
            } else if (questionId === 2) {
                functionCall = 'addTwoNumbers(input.l1, input.l2)';
            } else if (questionId === 3) {
                functionCall = 'lengthOfLongestSubstring(input.s)';
            }

            let script = '';
            let result = null;

            if (questionId === 2) {
                // For question 2, we need to create linked lists from arrays
                script = `
                    ${code}
                    const l1 = createLinkedList(input.l1);
                    const l2 = createLinkedList(input.l2);
                    const result = addTwoNumbers(l1, l2);
                    linkedListToArray(result);
                `;
                result = vm.run(script);
            } else {
                // For other questions, use the standard approach
                script = `
                    ${code}
                    const result = ${functionCall};
                    result;
                `;
                result = vm.run(script);
            }

            // Normalize arrays for comparison (sort if order doesn't matter for this problem)
            const normalizeArray = (arr) => {
                if (Array.isArray(arr)) {
                    // For Two Sum (question 1), order doesn't matter
                    if (questionId === 1) {
                        return arr.sort((a, b) => a - b);
                    }
                    // For other questions, order matters
                    return arr;
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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});