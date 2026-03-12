class MinHeap {
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
            const parentIndex = Math.floor((index - 1) / 2);
            
            if(this.heap[parentIndex][0] > this.heap[index][0]) break;
            
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        
        while(true) {
            let smallest = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            
            if(left < len && this.heap[left][0] < this.heap[smallest][0]) {
                smallest = left;
            }
            if(right < len && this.heap[right][0] < this.heap[smallest][0]) {
                smallest = right;
            }
            if(smallest === index) break;
            
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

function solution(n, edge) {
    let answer = 0;
    const INF = 50001
    const distance = new Array(n + 1).fill(INF);
    const adj = Array.from({length: n + 1}, () => []);
    
    for(let vertex of edge) {
        const [a, b] = vertex;
        adj[a].push(b);
        adj[b].push(a);
    }
    
    const queue = new MinHeap();
    distance[1] = 0;
    queue.push([0, 1]);
    
    while(!queue.isEmpty()) {
        const [dist, now] = queue.pop();
        
        if(dist > distance[now]) continue;
        
        for(let next of adj[now]) {
            const cost = dist + 1;
            if(cost < distance[next]) {
                distance[next] = cost;
                queue.push([cost, next]);
            }
        }
    }
    
    let maxDistance = 0;
    for(let i = 2; i <= n; i++) {
        if(maxDistance === distance[i]) {
            answer.push(i);
        }
        else if(maxDistance < distance[i]) {
            answer = [i];
            maxDistance = distance[i];
        }
    }
    
    return answer.length;
}