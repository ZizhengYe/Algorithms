// ==================== 问题2: 课程表II (LeetCode 210) ====================
console.log('\n=== 问题2: 课程表II - 返回课程学习顺序 ===');

/**
 * 问题描述：
 * 现在你总共有 numCourses 门课要上，记为 0 到 numCourses - 1。
 * 给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，
 * 表示在选修课程 ai 前 必须 先选修 bi 。
 * 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序。
 */

/**
 * 解法1: 使用DFS后序遍历
 */
function findOrder_DFS(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    const visited = Array(numCourses).fill(0);
    const result = [];

    function hasCycle(node) {
        if (visited[node] === 1) return true; // 发现环
        if (visited[node] === 2) return false; // 已访问

        visited[node] = 1;

        for (const neighbor of graph[node]) {
            if (hasCycle(neighbor)) return false;
        }

        visited[node] = 2;
        result.push(node); // 后序遍历，完成时添加
        return false // 无环
    }

    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0 && hasCycle(i)) return []
    }

    return result.reverse()
}

/**
 * 解法2: 使用BFS拓扑排序
 */

function findOrder_BFS(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => [])
    const indegree = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }

    const queue = [];
    const result = [];

    // 找到所有入度为0得节点
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        for (const neighbor of graph[current]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return result.length === numCourses ? result : [];
}

// 测试课程表II
const prerequisites3 = [[1,0],[2,0],[3,1],[3,2]];
console.log('测试数据: [[1,0],[2,0],[3,1],[3,2]]');
console.log('DFS方法:', findOrder_DFS(4, prerequisites3));
console.log('BFS方法:', findOrder_BFS(4, prerequisites3));