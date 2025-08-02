
const questions = [
    {
        id: 1,
        title: "Two Sum",
        description: `# Two Sum Problem

    Given an array of integers ` + "`nums`" + ` and an integer ` + "`target`" + `, return the indices of the two numbers such that they add up to ` + "`target`" + `.

    You can assume that each input will have exactly one solution, and you may not use the same element twice. The answer can be returned in any order.

    ## Examples

    **Example 1:**
    * **Input:** ` + "`nums = [2,7,11,15]`" + `, ` + "`target = 9`" + `
    * **Output:** ` + "`[0,1]`" + `
    * **Explanation:** Because ` + "`nums[0] + nums[1] == 9`" + `, we return ` + "`[0, 1]`" + `.

    **Example 2:**
    * **Input:** ` + "`nums = [3,2,4]`" + `, ` + "`target = 6`" + `
    * **Output:** ` + "`[1,2]`" + `

    **Example 3:**
    * **Input:** ` + "`nums = [3,3]`" + `, ` + "`target = 6`" + `
    * **Output:** ` + "`[0,1]`" + `

    ---

    ## Constraints

    * ` + "`2 <= nums.length <= 10^4`" + `
    * ` + "`-10^9 <= nums[i] <= 10^9`" + `
    * ` + "`-10^9 <= target <= 10^9`" + `
    * Only one valid answer exists.`,
        difficulty: "Easy",
        jsCode: `/**
    * @param {number[]} nums
    * @param {number} target
    * @return {number[]}
    */
    var twoSum = function(nums, target) {
        const numMap = new Map();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (numMap.has(complement)) {
                return [numMap.get(complement), i];
            }
            numMap.set(nums[i], i);
        }
    };`,
        testCases: [
            {
                input: `{
            nums: [2, 7, 11, 15],
            target: 9
        }`,
                output: `[0, 1]`
            },
            {
                input: `{
            nums: [3, 2, 4],
            target: 6
        }`,
                output: `[1, 2]`
            },
            {
                input: `{
            nums: [3, 3],
            target: 6
        }`,
                output: `[0, 1]`
            }
        ]

    }
]

module.exports = questions;
