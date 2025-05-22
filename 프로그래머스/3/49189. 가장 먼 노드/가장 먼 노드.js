class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    push(item) {
        this.items[this.tail] = item;
        this.tail += 1;
    }
    pop() {
        delete this.items[this.head];
        this.head += 1;
    }
    front() {
        return this.items[this.head];
    }
    size() {
        return this.tail - this.head;
    }
}

function solution(n, edge) {
    let answer = 0;
    const INF = Number.MAX_SAFE_INTEGER;
    const graph = Array.from({length: n + 1}, () => Array());
    const distance = new Array(n + 1).fill(INF);
    const visited = new Array(n + 1).fill(false);
    
    edge.forEach((vertex) => {
        const [a, b] = vertex;
        graph[a].push(b);
        graph[b].push(a);
    })
    
    const queue = new Queue();
    queue.push([1, 0]);
    distance[1] = 0;
    visited[1] = true;
    
    while(queue.size() > 0) {
        const [current, cost] = queue.front();
        queue.pop();
        
        for(let next of graph[current]) {
            if(visited[next]) continue;
            
            distance[next] = Math.min(distance[next], cost + 1);
            queue.push([next, cost + 1]);
            visited[next] = true;
        }
    }
    
    distance.sort((a, b) => b - a);
    
    let cnt = 1;
    for(let i = 2; i <= n; i++) {
        if(distance[i-1] !== distance[i]) {
            break;
        }
        cnt += 1;
    }
    
    return cnt;
}