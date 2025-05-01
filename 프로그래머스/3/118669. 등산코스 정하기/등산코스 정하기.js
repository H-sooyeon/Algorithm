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
    size() {
        return this.tail - this.head;
    }
    front() {
        return this.items[this.head];
    }
}

function solution(n, paths, gates, summits) {
    let answer = []; // 산봉우리의 번호, intensity 최솟값
    // path: 등산로 정보, gates: 출입구 번호, summits: 산봉우리
    const graph = Array.from({length: n + 1}, () => Array());
    const nodes = new Array(n + 1).fill(0); // 1이면 출입로, 2이면 산봉우리
    let minSummit = 50001;
    let minValue = 10000001;
    
    for(const path of paths) {
        const [i, j, w] = path;
        
        graph[i].push([j, w]);
        graph[j].push([i, w]);
    }
    
    gates.forEach((gate) => nodes[gate] = 1);
    summits.forEach((summit) => nodes[summit] = 2);
    
    const bfs = (gate) => {
        const visited = new Array(n + 1).fill(0);
        const queue = new Queue();
        
        queue.push([gate, 0]);
        while(queue.size() > 0) {
            const [cur, cost] = queue.front();
            queue.pop();
            
            if(minValue < cost) continue;
            
            for(let [next, time] of graph[cur]) {
                const intensity = Math.max(time, cost);
                
                // 출입로라면
                if(nodes[next] === 1) continue;
                // 산봉우리라면
                if(nodes[next] === 2) {
                    if(minValue > intensity) {
                        minValue = intensity;
                        minSummit = next;
                    }
                    else if(minValue === intensity && minSummit > next) {
                        minSummit = next;
                    }
                }
                
                if(nodes[next] === 0) {
                    if(visited[next] === 0 || visited[next] > intensity) {
                        visited[next] = intensity;
                        queue.push([next, intensity]);
                    }
                }
            }
        }
    }
    
    for(let gate of gates) {
        bfs(gate);
    }
        
    return [minSummit, minValue];
}