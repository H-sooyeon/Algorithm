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
            
            if(this.heap[index][0] < this.heap[parentIndex][0]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        
        while(true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let smallest = index;
            
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

function solution(N, road, K) {
    let answer = 0;
    const INF = 50 * 10000
    const distance = new Array(N + 1).fill(INF);
    const graph = Array.from({length: N + 1}, () => []);

    const dijkstra = (start) => {
        const queue = new MinHeap();
        
        queue.push([start, 0]);
        distance[start] = 0;
        
        while(!queue.isEmpty()) {
            const [now, dist] = queue.pop();
            
            if(distance[now] < dist) continue;
            
            for(let [adjNode, weight] of graph[now]) {  
                const cost = dist + weight;
                                                      
                if(distance[adjNode] > cost) {
                    distance[adjNode] = cost;
                    queue.push([adjNode, cost])
                }
            }
        }
    }
    
    for(let item of road) {
        const [a, b, c] = item;
        graph[a].push([b, c]);
        graph[b].push([a, c]);
    }
        
    dijkstra(1);
    
    for(let cost of distance) {
        if(cost <= K) answer += 1;
    }

    return answer;
}