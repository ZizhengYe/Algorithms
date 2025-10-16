// ==================== 问题4: 零一背包问题 ====================
console.log('\n=== 问题4: 零一背包 - 最大价值 ===');

/**
 * 问题描述：
 * 给定物品重量和价值数组，背包容量为 W，求最大价值。
 */
/**
 * 解法1: 动态规划
 * 时间复杂度: O(nW)
 * 空间复杂度: O(nW)
 */
function knapsack(weights, values, W) {
    const n = weights.length;
    // dp[i][w] 表示前i个物品，容量为w时的最大价值
    const dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
            
        }
    }

    return dp[n][W]
}


/**
 * 解法2: 动态规划(优化空间复杂度)
 * 时间复杂度: O(nW)
 * 空间复杂度: O(W)
 */

function knapsackOp(weights, values, W) {
    const n = weights.length;
    const dp = Array(W + 1).fill(0);
    for (let i = 0; i < n; i++) {
        for (let w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

// 测试用例
console.log('最大价值:', knapsack([1,3,4,5], [1,4,5,7], 7));