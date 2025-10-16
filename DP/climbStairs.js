// ==================== 问题2: 爬楼梯 (LeetCode 70) ====================
console.log('\n=== 问题2: 爬楼梯 - 有多少种爬法 ===');

/**
 * 问题描述：
 * 有 n 阶楼梯，每次可以爬 1 或 2 阶，问有多少种爬法？
 */

/**
 * 解法1: 动态规划
 * 时间复杂度: O(n)
 * 空间复杂度: O(n)
 */

function climbStairs(n) {
    if (n <=2 ) return n;
    const dp = [0, 1, 2];
    for (let i = 3; i <=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// 测试用例
console.log('爬5阶楼梯的方案数:', climbStairs(5));