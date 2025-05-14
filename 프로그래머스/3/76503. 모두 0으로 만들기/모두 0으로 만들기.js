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

function solution(a, edges) {
    let answer = 0n;
    const indegree = new Array(a.length).fill(0);
    const tree = Array.from({length: a.length}, () => Array());
    const visited = new Array(a.length).fill(false);
    const queue = new Queue();
    const copyA = a.slice();

    // 트리의 모든 점들을 가중치 0으로 만드는 것이 불가능하다면 -1 return
    const sum = a.reduce((acc, cur) => acc + cur, 0);
    if(sum !== 0) {
        return -1;
    }
    
    edges.forEach((edge) => {
        const [u, v] = edge;
        
        tree[u].push(v);
        tree[v].push(u);
        
        indegree[u] += 1;
        indegree[v] += 1;
    })
    
    for(let i = 0; i < indegree.length; i++) {
        if(indegree[i] === 1) {
            queue.push(i);
        }
    }
        
    while(queue.size() > 0) {
        const cur = queue.front();
        queue.pop();
        
        visited[cur] = true;
        answer += BigInt(Math.abs(copyA[cur]));

        for(let next of tree[cur]) {
            if(!visited[next]) {
                indegree[next] -= 1;
                copyA[next] += copyA[cur];
                copyA[cur] = 0;
                
                if(indegree[next] === 1) {
                    queue.push(next);
                }
            }
        }
    }
    
    return answer;
}