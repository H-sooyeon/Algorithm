// 다익스트라
// 플로이드워셜은 노드의 총 개수가 500개 이하일 때만 가능
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
            const parentIdx = Math.floor((index - 1) / 2);
            if(this.heap[parentIdx][0] < this.heap[index][0]) break;
            
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        while(true) {
            const left = index * 2 + 1;
            const right = index * 2 + 1;
            let smallest = index;
            
            if(left < len && this.heap[left][0] < this.heap[smallest][0]) {
                smallest = left;
            }
            if(right < len && this.heap[right][0] < this.heap[smallest][0]) {
                smallest = right;
            }
            if(smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
function solution(n, roads, sources, destination) {
    let answer = [];
    const MAX = 100001;
    const INF = Number.MAX_SAFE_INTEGER;
    const adj = Array.from({length: MAX}, () => []);
    const distance = new Array(MAX).fill(INF);
    
    for(let road of roads) {
        const [a, b] = road;
        adj[a].push([b, 1]);
        adj[b].push([a, 1]);
    }
    
    const dijkstra = (start) => {
        const priorityQueue = new MinHeap();
        
        priorityQueue.push([start, 0]);
        distance[start] = 0;
        
        while(!priorityQueue.isEmpty()) {
            const [cur, dist] = priorityQueue.pop();
            
            if(distance[cur] < dist) continue;
            
            for(let [next, nDist] of adj[cur]) {
                const cost = dist + nDist;
                
                if(distance[next] > cost) {
                    distance[next] = cost;
                    priorityQueue.push([next, cost]);
                }
            }
        }
    }
    
    dijkstra(destination);
    
    for(let source of sources) {
        if(distance[source] === INF) answer.push(-1);
        else answer.push(distance[source]);
    }
    
    return answer;
}