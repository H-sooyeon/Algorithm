class Queue {
    constructor() {
        this.items = {};
        this.tail = 0;
        this.head = 0;
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

function solution(n, roads, sources, destination) {
    const INF = 987654321;
    let answer = [];
    // destination으로 이동해야 한다.
    // 각 부대원이 위치한 sources를 시작으로, roads를 참고해 destination으로 이동해야 한다.
    // 목적지부터 시작
    
    const tree = Array.from({length: n + 1}, () => Array());
    const memo = new Array(n + 1).fill(INF);
    memo[destination] = 0;
    
    for(const road of roads) {
        const [a, b] = road;
        tree[a].push(b);
        tree[b].push(a);
    }
    
    const queue = new Queue();
    queue.push([destination, 0]); // 목적지부터 시작, 시간
    
    while(queue.size() > 0) {
        const [cur, time] = queue.front();
        queue.pop();
        
        for(const next of tree[cur]) {
            if(memo[next] === INF) {
                queue.push([next, time + 1]);
                memo[next] = time + 1;
            }
        }
    }
    
    // console.log(memo);
    
    sources.forEach((source) => {
        if(memo[source] !== INF) {
            answer.push(memo[source]);
        }
        else if(memo[source] === INF) {
            answer.push(-1);
        }
    });
    
    return answer;
}