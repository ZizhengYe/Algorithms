// ==================== 问题3: 最大子数组和 (LeetCode 53) ====================
console.log('\n=== 问题3: 最大子数组和 - 连续子数组最大和 ===');

/**
 * 问题描述：
 * 给定一个整数数组，找到最大和的连续子数组。
 */

/**
 * 解法1: 动态规划（Kadane算法）
 * 时间复杂度: O(n)
 * 空间复杂度: O(1)
 */

function maxSubArray(nums) {
    let maxSum = nums[0], currSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
}

// 测试用例
console.log('最大子数组和:', maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));