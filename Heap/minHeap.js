// ==================== 最小堆实现 ====================
class MinHeap {
    constructor() {
        this.heap = [];
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

    // 上浮操作（插入时使用）
    heapifyUp(index = this.heap.length - 1) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            // 如果当前节点大于等于父节点，停止上浮
            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }
            
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    // 下沉操作（删除时使用）
    heapifyDown(index = 0) {
        while (this.getLeftChildIndex(index) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            // 找到最小的子节点
            let smallestIndex = leftChildIndex;
            if (rightChildIndex < this.heap.length && 
                this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                smallestIndex = rightChildIndex;
            }
            
            // 如果当前节点已经是最小的，停止下沉
            if (this.heap[index] <= this.heap[smallestIndex]) {
                break;
            }
            
            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
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

    buildHeap(array) {
        this.heap = [...array];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    print() {
        console.log('堆数组:', this.heap);
    }
}


console.log('\n=== 最小堆测试 ===');
const minHeap = new MinHeap();

// 使用buildHeap方法
minHeap.buildHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
console.log('构建最小堆:', minHeap.heap);

console.log('\n提取最小元素:');
while (!minHeap.isEmpty()) {
    console.log('提取:', minHeap.extractMin(), '剩余:', minHeap.heap);
}