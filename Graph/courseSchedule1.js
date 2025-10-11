// ==================== 问题1: 课程表I (LeetCode 207) ====================
console.log('\n=== 问题1: 课程表I - 判断是否可以完成所有课程 ===');

/**
 * 问题描述：
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1。
 * 在选修某些课程之前需要一些先修课程。先修课程按数组 prerequisites 给出，
 * 其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程 bi 。
 * 请你判断是否可能完成所有课程的学习？
 */

/**
 * 解法1: 使用DFS检测环
 * 时间复杂度: O(V + E)
 * 空间复杂度: O(V + E)
 */
function canFinish_DFS(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // 0: 未访问, 1: 正在访问, 2: 已访问
    const visited = Array(numCourses).fill(0);

    function hasCycle(node) {
        if (visited[node] === 1) return true;
        if (visited[node] === 2) return false;

        visited[node] = 1

        for (const neighbor of graph[node]) {
            if (hasCycle(neighbor)) return true;
        }

        visited[node] = 2
        return false
    }

    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0 && hasCycle(i)) return false;
    }

    return true;
}

/**
 * 解法2: 使用BFS拓扑排序（Kahn算法）
 * 时间复杂度: O(V + E)
 * 空间复杂度: O(V + E)
 */

function canFinish_BFS(numCourses, prerequisites) {
    // 构建邻接表和入度数组
    const graph = Array(numCourses).fill().map(() => []);
    const indegree = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }

    // 找到所有入度为0的节点
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    let processedCourses = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        processedCourses++;

        // 处理当前节点的所有邻居
        for (const neighbor of graph[current]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return processedCourses === numCourses;
}

// 测试课程表I
const prerequisites1 = [[1,0]]; // 要学课程1，必须先学课程0
const prerequisites2 = [[1,0],[0,1]]; // 循环依赖

console.log('测试数据1: [[1,0]]');
console.log('DFS方法:', canFinish_DFS(2, prerequisites1));
console.log('BFS方法:', canFinish_BFS(2, prerequisites1));

console.log('\n测试数据2: [[1,0],[0,1]] (循环依赖)');
console.log('DFS方法:', canFinish_DFS(2, prerequisites2));
console.log('BFS方法:', canFinish_BFS(2, prerequisites2));