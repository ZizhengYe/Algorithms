// ==================== 问题3: 课程表III (LeetCode 630) ====================
console.log('\n=== 问题3: 课程表III - 最多能修多少门课 ===');

/**
 * 问题描述：
 * 这里有 n 门不同的在线课程，按从 1 到 n 编号。
 * 给你一个数组 courses ，其中 courses[i] = [durationi, lastDayi] 
 * 表示第 i 门课将会 持续 上 durationi 天课，并且必须在不晚于 lastDayi 的时候完成。
 * 你的学期从第 1 天开始，且不能同时修读两门及两门以上的课程。
 * 返回你最多可以修读的课程数目。
 */

/**
 * 解法: 贪心算法 + 优先队列
 * 思路: 
 * 1. 按截止时间排序
 * 2. 贪心选择，如果当前课程可以完成就选择
 * 3. 如果不能完成，但当前课程用时比已选课程中最长的短，就替换
 */
function scheduleCourse(courses) {
    // 按截止时间排序
    courses.sort((a, b) => a[1] - b[1]);

    // 使用最大堆存储已选课程的持续时间
    const maxHeap = [];
    let currentTime = 0;

    // 最大堆的辅助函数
    function heapifyUp(heap, index) {
        
    }
}