class MaxHeap {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this.bubbleUp();
    }
    pop() {
        if(this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return top;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if(this.heap[index] <= this.heap[parentIdx]) break;
            
            [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
            index = parentIdx;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        
        while(true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let largest = index;
            
            if(left < len && this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            if(right < len && this.heap[right] > this.heap[largest]) {
                largest = right;
            }
            if(largest === index) break;
            [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
            index = largest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    
}

function solution(n, k, enemy) {    
    if(k >= enemy.length) return enemy.length;
    
    let handleEnemy = 0;
    const maxHeap = new MaxHeap();
    for(let i = 0; i < enemy.length; i++) {
        maxHeap.push(enemy[i]);
        handleEnemy += enemy[i];
        
        while(handleEnemy > n && k > 0) {
            handleEnemy -= maxHeap.pop();
            k -= 1;
        }
        
        if(handleEnemy > n && k === 0) {
            return i;
        }
    }
    
    if(handleEnemy <= n) return enemy.length;
    
    return 0;
}