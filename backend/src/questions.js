
const questions = [
    {
        id: 1,
        title: "Two Sum",
        description: `# Two Sum Problem

Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You can assume that each input will have exactly one solution, and you may not use the same element twice. The answer can be returned in any order.

## Examples

**Example 1:**
* **Input:** \`nums = [2,7,11,15]\`, \`target = 9\`
* **Output:** \`[0,1]\`
* **Explanation:** Because \`nums[0] + nums[1] == 9\`, we return \`[0, 1]\`.

**Example 2:**
* **Input:** \`nums = [3,2,4]\`, \`target = 6\`
* **Output:** \`[1,2]\`

**Example 3:**
* **Input:** \`nums = [3,3]\`, \`target = 6\`
* **Output:** \`[0,1]\`

---

## Constraints

* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
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
    },
    {
        id: 2,
        title: "Add Two Numbers",
        description: `# Add Two Numbers

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## Examples

**Example 1:**
* **Input:** l1 = [2,4,3], l2 = [5,6,4]
* **Output:** [7,0,8]
* **Explanation:** 342 + 465 = 807.

**Example 2:**
* **Input:** l1 = [0], l2 = [0]
* **Output:** [0]

**Example 3:**
* **Input:** l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
* **Output:** [8,9,9,9,0,0,0,1]

---

## Constraints

* The number of nodes in each linked list is in the range [1, 100].
* 0 <= Node.val <= 9
* It is guaranteed that the list represents a number that does not have leading zeros.`,
        difficulty: "Medium",
        jsCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
    }
    
    return dummy.next;
};`,
        testCases: [
            {
                input: `{
            l1: [2,4,3],
            l2: [5,6,4]
        }`,
                output: `[7,0,8]`
            },
            {
                input: `{
            l1: [0],
            l2: [0]
        }`,
                output: `[0]`
            }
        ]
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        description: `# Longest Substring Without Repeating Characters

Given a string \`s\`, find the length of the **longest substring** without repeating characters.

## Examples

**Example 1:**
* **Input:** s = "abcabcbb"
* **Output:** 3
* **Explanation:** The answer is "abc", with the length of 3.

**Example 2:**
* **Input:** s = "bbbbb"
* **Output:** 1
* **Explanation:** The answer is "b", with the length of 1.

**Example 3:**
* **Input:** s = "pwwkew"
* **Output:** 3
* **Explanation:** The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

---

## Constraints

* 0 <= s.length <= 5 * 10^4
* s consists of English letters, digits, symbols and spaces.`,
        difficulty: "Medium",
        jsCode: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let start = 0;
    let charMap = new Map();
    
    for (let end = 0; end < s.length; end++) {
        if (charMap.has(s[end])) {
            start = Math.max(start, charMap.get(s[end]) + 1);
        }
        charMap.set(s[end], end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
};`,
        testCases: [
            {
                input: `{
            s: "abcabcbb"
        }`,
                output: `3`
            },
            {
                input: `{
            s: "bbbbb"
        }`,
                output: `1`
            },
            {
                input: `{
            s: "pwwkew"
        }`,
                output: `3`
            }
        ]
    }
]

module.exports = questions;
