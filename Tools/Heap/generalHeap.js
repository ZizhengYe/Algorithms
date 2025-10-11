// ==================== 通用堆类（支持自定义比较函数）====================
class Heap {
    constructor(compareFunction) {
        this.heap = [];
        // 默认为最小堆比较函数
        this.compare = compareFunction || ((a, b) => a - b);
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    heapifyUp(index = this.heap.length - 1) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
                break;
            }
            
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    heapifyDown(index = 0) {
        while (this.getLeftChildIndex(index) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            let targetIndex = leftChildIndex;
            if (rightChildIndex < this.heap.length && 
                this.compare(this.heap[rightChildIndex], this.heap[leftChildIndex]) < 0) {
                targetIndex = rightChildIndex;
            }
            
            if (this.compare(this.heap[index], this.heap[targetIndex]) <= 0) {
                break;
            }
            
            this.swap(index, targetIndex);
            index = targetIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return top;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

console.log('\n=== 自定义比较函数的堆 ===');

// 创建最大堆（通过自定义比较函数）
const customMaxHeap = new Heap((a, b) => b - a);
[3, 1, 4, 1, 5, 9, 2, 6].forEach(num => customMaxHeap.insert(num));
console.log('自定义最大堆:', customMaxHeap.heap);

// 创建对象堆（按优先级排序）
const priorityHeap = new Heap((a, b) => a.priority - b.priority);
const tasks = [
    { name: 'Task A', priority: 3 },
    { name: 'Task B', priority: 1 },
    { name: 'Task C', priority: 2 },
    { name: 'Task D', priority: 5 }
];

tasks.forEach(task => priorityHeap.insert(task));
console.log('优先级堆:');
while (!priorityHeap.isEmpty()) {
    const task = priorityHeap.extract();
    console.log(`执行: ${task.name} (优先级: ${task.priority})`);
}
