/**
 * 堆的原理和实现
 * 堆是一种特殊的完全二叉树，常用于实现优先队列
 */

console.log('=== 堆数据结构的原理和实现 ===');

// ==================== 最大堆实现 ====================
// 导出最大堆类
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // 获取父节点索引
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // 获取左子节点索引
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // 获取右子节点索引
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // 交换两个元素
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // 上浮操作（插入时使用）
    heapifyUp(index = this.heap.length - 1) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            // 如果当前节点小于等于父节点，停止上浮
            if (this.heap[index] <= this.heap[parentIndex]) {
                break;
            }
            
            // 交换当前节点和父节点
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    // 下沉操作（删除时使用）
    heapifyDown(index = 0) {
        while (this.getLeftChildIndex(index) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            // 找到最大的子节点
            let largestIndex = leftChildIndex;
            if (rightChildIndex < this.heap.length && 
                this.heap[rightChildIndex] > this.heap[leftChildIndex]) {
                largestIndex = rightChildIndex;
            }
            
            // 如果当前节点已经是最大的，停止下沉
            if (this.heap[index] >= this.heap[largestIndex]) {
                break;
            }
            
            // 交换当前节点和最大子节点
            this.swap(index, largestIndex);
            index = largestIndex;
        }
    }

    // 插入元素
    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    // 删除并返回最大元素
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop(); // 将最后一个元素移到根部
        this.heapifyDown();
        return max;
    }

    // 查看最大元素但不删除
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // 获取堆大小
    size() {
        return this.heap.length;
    }

    // 检查堆是否为空
    isEmpty() {
        return this.heap.length === 0;
    }

    // 从数组构建堆（O(n)时间复杂度）
    buildHeap(array) {
        this.heap = [...array];
        // 从最后一个非叶节点开始向上进行heapifyDown
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    // 打印堆结构
    print() {
        console.log('堆数组:', this.heap);
        this.printTree();
    }

    // 以树形结构打印堆
    printTree() {
        if (this.heap.length === 0) {
            console.log('空堆');
            return;
        }
        
        const levels = Math.floor(Math.log2(this.heap.length)) + 1;
        console.log('树形结构:');
        
        for (let level = 0; level < levels; level++) {
            const start = Math.pow(2, level) - 1;
            const end = Math.min(Math.pow(2, level + 1) - 1, this.heap.length);
            const levelNodes = this.heap.slice(start, end);
            
            const spaces = ' '.repeat(Math.pow(2, levels - level - 1) - 1);
            const between = ' '.repeat(Math.pow(2, levels - level) - 1);
            
            console.log(spaces + levelNodes.join(between));
        }
    }
}

// 导出class
module.exports = { MaxHeap };

// // ==================== 测试和示例 ====================
// console.log('\n=== 最大堆测试 ===');
// const maxHeap = new MaxHeap();

// // 插入元素
// [4, 1, 3, 2, 16, 9, 10, 14, 8, 7].forEach(num => {
//     maxHeap.push(num);
//     console.log(`插入 ${num}:`, maxHeap.heap);
// });

// maxHeap.print();

// console.log('\n提取最大元素:');
// while (!maxHeap.isEmpty()) {
//     console.log('提取:', maxHeap.pop(), '剩余:', maxHeap.heap);
// }




// // ==================== 堆的应用场景 ====================
// console.log('\n=== 堆的应用场景 ===');
// console.log(`
// 堆的主要应用：

// 1. 优先队列
//    - 任务调度
//    - 事件处理
//    - Dijkstra算法

// 2. 堆排序
//    - 时间复杂度 O(n log n)
//    - 原地排序
//    - 不稳定排序

// 3. 找第K大/小元素
//    - Top K问题
//    - 中位数查找

// 4. 合并K个有序链表/数组

// 5. 图算法
//    - Prim最小生成树
//    - Dijkstra最短路径

// 时间复杂度：
// - 插入: O(log n)
// - 删除顶部: O(log n)
// - 查看顶部: O(1)
// - 构建堆: O(n)

// 空间复杂度:O(n)
// `);