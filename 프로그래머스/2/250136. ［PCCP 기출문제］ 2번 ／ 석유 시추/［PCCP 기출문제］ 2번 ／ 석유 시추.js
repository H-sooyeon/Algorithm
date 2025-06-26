class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(item) {
        this.items[this.tail] = item;
        this.tail += 1;
    }
    dequeue() {
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head += 1;
        return item;
    }
    size() {
        return this.tail - this.head;
    }
}

function solution(land) {
    let answer = 0;
    const n = land.length;
    const m = land[0].length;
    const oil = new Array(m).fill(0);
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    
    const bfs = (i, j) => {
        const queue = new Queue();
        queue.enqueue([i, j]);
        visited[i][j] = true;
        
        let minX = j;
        let maxX = j;
        let cnt = 0;
        
        while(queue.size()) {
            const [y, x] = queue.dequeue();
            cnt += 1;
            
            if(minX > x) {
                minX = x;
            }
            if(maxX < x) {
                maxX = x;
            }
            
            for(let i = 0; i < 4; i++) {
                let ny = y + dy[i];
                let nx = x + dx[i];
                
                if(ny >= n || nx >= m || ny < 0 || nx < 0) continue;
                if(visited[ny][nx] || land[ny][nx] === 0) continue;
                
                queue.enqueue([ny, nx]);
                visited[ny][nx] = true;
            }
        }
        
        return { cnt, minX, maxX };
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(land[i][j] === 1 && !visited[i][j]) {
                const { cnt, minX, maxX } = bfs(i, j);
                
                for(let x = minX; x <= maxX; x++) {
                    oil[x] += cnt;
                }
            }
        }
    }
        
    return Math.max(...oil);
}