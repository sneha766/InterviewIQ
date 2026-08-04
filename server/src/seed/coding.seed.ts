export const codingProblems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    acceptanceRate: 52.4,

    description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution,
and you may not use the same element twice.
`,

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],

    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],

    hints: [
      "Can you solve it in one pass?",
      "Use a HashMap.",
    ],

    tags: [
      "Array",
      "Hash Table",
    ],

    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

    }
};`,

      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {

    }
}`,

      python: `class Solution:
    def twoSum(self, nums, target):
        pass`,

      javascript: `var twoSum = function(nums, target) {

};`,

      go: `func twoSum(nums []int, target int) []int {

}`,
    },
  },

  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    acceptanceRate: 41.2,

    description: `
Given a string s containing just the characters
'(', ')', '{', '}', '[' and ']',
determine if the input string is valid.
`,

    examples: [
      {
        input: `"()"`,
        output: "true",
      },
      {
        input: `"()[]{}"`,
        output: "true",
      },
      {
        input: `"(]"`,
        output: "false",
      },
    ],

    constraints: [
      "1 <= s.length <= 10^4",
      "s consists only of brackets.",
    ],

    hints: [
      "Use a stack.",
      "Match closing brackets with the latest opening bracket.",
    ],

    tags: [
      "Stack",
      "String",
    ],

    starterCode: {
      cpp: `class Solution {
public:
    bool isValid(string s) {

    }
};`,

      java: `class Solution {
    public boolean isValid(String s) {

    }
}`,

      python: `class Solution:
    def isValid(self, s):
        pass`,

      javascript: `var isValid = function(s) {

};`,

      go: `func isValid(s string) bool {

}`,
    },
  },

  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    acceptanceRate: 56.7,

    description: `
You are given an array prices where prices[i] is the price
of a given stock on the ith day.

Find the maximum profit.
`,

    examples: [
      {
        input: "[7,1,5,3,6,4]",
        output: "5",
      },
    ],

    constraints: [
      "1 <= prices.length <= 10^5",
    ],

    hints: [
      "Track minimum price.",
      "Greedy approach.",
    ],

    tags: [
      "Array",
      "Greedy",
    ],

    starterCode: {
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {

    }
};`,

      java: `class Solution {
    public int maxProfit(int[] prices) {

    }
}`,

      python: `class Solution:
    def maxProfit(self, prices):
        pass`,

      javascript: `var maxProfit = function(prices) {

};`,

      go: `func maxProfit(prices []int) int {

}`,
    },
  },

  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    acceptanceRate: 58.2,

    description: `
Given a sorted array of integers nums and an integer target,
return the index if found, otherwise -1.
`,

    examples: [
      {
        input: "nums=[-1,0,3,5,9,12], target=9",
        output: "4",
      },
    ],

    constraints: [
      "nums is sorted.",
    ],

    hints: [
      "Divide and conquer.",
    ],

    tags: [
      "Binary Search",
    ],

    starterCode: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {

    }
};`,

      java: `class Solution {
    public int search(int[] nums, int target) {

    }
}`,

      python: `class Solution:
    def search(self, nums, target):
        pass`,

      javascript: `var search = function(nums, target) {

};`,

      go: `func search(nums []int, target int) int {

}`,
    },
  },

  {
    title: "Merge Sorted Array",
    slug: "merge-sorted-array",
    difficulty: "Easy",
    acceptanceRate: 49.5,

    description: `
Merge nums2 into nums1 as one sorted array.
`,

    examples: [
      {
        input: "nums1=[1,2,3,0,0,0], nums2=[2,5,6]",
        output: "[1,2,2,3,5,6]",
      },
    ],

    constraints: [
      "Both arrays are sorted.",
    ],

    hints: [
      "Start from the end.",
    ],

    tags: [
      "Array",
      "Two Pointers",
      "Sorting",
    ],

    starterCode: {
      cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {

    }
};`,

      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {

    }
}`,

      python: `class Solution:
    def merge(self, nums1, m, nums2, n):
        pass`,

      javascript: `var merge = function(nums1,m,nums2,n){

};`,

      go: `func merge(nums1 []int, m int, nums2 []int, n int) {

}`,
    },
  },
];