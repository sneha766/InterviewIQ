export const codingProblems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    acceptanceRate: 52.4,

    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.`,

    examples: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].",
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2].",
      },
      {
        input: "[3,3]\n6",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 3 + 3 = 6, so we return [0, 1].",
      },
    ],

    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],

    hints: ["Can you solve it in one pass?", "Use a HashMap to store complements."],

    tags: ["Array", "Hash Table"],

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
    def twoSum(self, nums: List[int], target: int) -> List[int]:
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

    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,

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
      {
        input: `"{[]}"`,
        output: "true",
      },
    ],

    constraints: ["1 <= s.length <= 10^4", "s consists only of brackets '()[]{}'."],

    hints: ["Use a stack data structure.", "Match closing brackets with the latest opening bracket on the stack."],

    tags: ["Stack", "String"],

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
    def isValid(self, s: str) -> bool:
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

    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,

    examples: [
      {
        input: "[7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
      },
      {
        input: "[7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and max profit = 0.",
      },
      {
        input: "[1,2,4,2,5,7,2,4,9,0]",
        output: "8",
      },
    ],

    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],

    hints: ["Keep track of the minimum price seen so far.", "At each step, calculate the potential profit if sold today."],

    tags: ["Array", "Dynamic Programming", "Greedy"],

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
    def maxProfit(self, prices: List[int]) -> int:
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

    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,

    examples: [
      {
        input: "[-1,0,3,5,9,12]\n9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "[-1,0,3,5,9,12]\n2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],

    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],

    hints: ["Maintain low and high pointers.", "Calculate mid = low + (high - low) / 2 to prevent overflow."],

    tags: ["Array", "Binary Search"],

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
    def search(self, nums: List[int], target: int) -> int:
        pass`,
      javascript: `var search = function(nums, target) {
    
};`,
      go: `func search(nums []int, target int) int {
    
}`,
    },
  },

  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    acceptanceRate: 52.8,

    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,

    examples: [
      {
        input: "2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step  2. 2 steps.",
      },
      {
        input: "3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1  2. 1+2  3. 2+1.",
      },
      {
        input: "5",
        output: "8",
      },
    ],

    constraints: ["1 <= n <= 45"],

    hints: ["To reach step n, you must come from step n-1 or n-2.", "This follows the Fibonacci sequence pattern."],

    tags: ["Math", "Dynamic Programming", "Memoization"],

    starterCode: {
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
      javascript: `var climbStairs = function(n) {
    
};`,
      go: `func climbStairs(n int) int {
    
}`,
    },
  },

  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    acceptanceRate: 54.1,

    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.`,

    examples: [
      {
        input: "[1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are [1,8,6,2,5,4,8,3,7]. Max area is between index 1 and 8: min(8, 7) * (8 - 1) = 49.",
      },
      {
        input: "[1,1]",
        output: "1",
      },
      {
        input: "[4,3,2,1,4]",
        output: "16",
      },
    ],

    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],

    hints: ["Use a two-pointer approach starting at both ends.", "Move the pointer with the smaller height inwards."],

    tags: ["Array", "Two Pointers", "Greedy"],

    starterCode: {
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        pass`,
      javascript: `var maxArea = function(height) {
    
};`,
      go: `func maxArea(height []int) int {
    
}`,
    },
  },

  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    acceptanceRate: 33.6,

    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,

    examples: [
      {
        input: "[-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        input: "[0,1,1]",
        output: "[]",
      },
      {
        input: "[0,0,0]",
        output: "[[0,0,0]]",
      },
    ],

    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],

    hints: ["Sort the array first.", "Fix one element and use two pointers for the remaining pair."],

    tags: ["Array", "Two Pointers", "Sorting"],

    starterCode: {
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        pass`,
      javascript: `var threeSum = function(nums) {
    
};`,
      go: `func threeSum(nums []int) [][]int {
    
}`,
    },
  },

  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    acceptanceRate: 50.3,

    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,

    examples: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "[1]",
        output: "1",
      },
      {
        input: "[5,4,-1,7,8]",
        output: "23",
      },
    ],

    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],

    hints: ["Use Kadane's Algorithm.", "Maintain current sum and max sum found so far."],

    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],

    starterCode: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        pass`,
      javascript: `var maxSubArray = function(nums) {
    
};`,
      go: `func maxSubArray(nums []int) int {
    
}`,
    },
  },

  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    acceptanceRate: 42.9,

    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,

    examples: [
      {
        input: "[1,2,5]\n11",
        output: "3",
        explanation: "11 = 5 + 5 + 1.",
      },
      {
        input: "[2]\n3",
        output: "-1",
      },
      {
        input: "[1]\n0",
        output: "0",
      },
    ],

    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],

    hints: ["Use Dynamic Programming with a 1D DP table.", "dp[i] stores the min coins needed to form amount i."],

    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],

    starterCode: {
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        
    }
}`,
      python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        pass`,
      javascript: `var coinChange = function(coins, amount) {
    
};`,
      go: `func coinChange(coins []int, amount int) int {
    
}`,
    },
  },

  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    acceptanceRate: 60.5,

    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,

    examples: [
      {
        input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped.",
      },
      {
        input: "[4,2,0,3,2,5]",
        output: "9",
      },
    ],

    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],

    hints: ["Use two pointers or monotonic stack.", "Water trapped at i = min(max_left, max_right) - height[i]."],

    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],

    starterCode: {
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        
    }
}`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        pass`,
      javascript: `var trap = function(height) {
    
};`,
      go: `func trap(height []int) int {
    
}`,
    },
  },
];