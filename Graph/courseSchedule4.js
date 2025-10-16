// ==================== 问题4: 课程表IV (LeetCode 1462) ====================
console.log('\n=== 问题4: 课程表IV - 课程安排的可行性 ===');

/**
 * 问题描述：
 * 你总共需要上 numCourses 门课，课程编号依次为 0 到 numCourses-1 。
 * 你会得到一个数组 prerequisite ，其中 prerequisites[i] = [ai, bi] 表示如果你想选 ai 课程，你 必须 先选 bi 课程。
 * 有些课程可能没有先修课程。
 * 另外，给你一个数组 queries ，其中 queries[j] = [uj, vj]。
 * 对于第 j 个查询，您应该回答课程 uj 是否是课程 vj 的先修课程。
 */

/**
 * 解法1: Floyd-Warshall算法
 */


/**
 * 解法2: 拓扑排序 + DFS
 */
function checkIfPrerequisite_DFS(numCourses, prerequisites, queries) {
    const graph = Array(numCourses).fill().map(() => []);
    
    // 构建图
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
    }
    
    // 对每个课程，找到所有可达的课程
    const reachable = Array(numCourses).fill().map(() => new Set());
    
    function dfs(node, visited) {
        if (visited.has(node)) return;
        visited.add(node);
        
        for (const next of graph[node]) {
            reachable[node].add(next);
            dfs(next, visited);
            
            // 添加传递依赖
            for (const reach of reachable[next]) {
                reachable[node].add(reach);
            }
            
        }
    }
    
    for (let i = 0; i < numCourses; i++) {
        dfs(i, new Set());
    }
    
    return queries.map(([u, v]) => reachable[v].has(u));
}


// 测试课程表IV
const numCourses4 = 5;
const prerequisites4 = [[1,2],[1,0],[2,0],[2,3],[3,4]];
const queries4 = [[1,0],[1,2],[1,3],[1,4]];

console.log('课程数:', numCourses4);
console.log('先修关系:', prerequisites4);
console.log('查询:', queries4);


console.log('DFS方法:', checkIfPrerequisite_DFS(numCourses4, prerequisites4, queries4));