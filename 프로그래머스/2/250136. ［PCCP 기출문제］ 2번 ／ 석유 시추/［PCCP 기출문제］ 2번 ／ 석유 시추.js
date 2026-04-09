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
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    
    const petroleum = new Array(m).fill(0);
    
    const bfs = (curY, curX) => {
        const queue = new Queue();
        queue.push([curY, curX]); // y, x, cnt, maxX
        visited[curY][curX] = true;
        
        let resultCnt = 0;
        let maxX = curX;
        while(queue.size()) {
            const [y, x] = queue.pop();
            
            resultCnt += 1;
            maxX = Math.max(maxX, x);
            
            for(let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                
                if(ny >= n || nx >= m || ny < 0 || nx < 0) continue;
                if(visited[ny][nx] || land[ny][nx] === 0) continue;
                
                visited[ny][nx] = true;
                queue.push([ny, nx]);
            }
        }
        
        return [resultCnt, maxX];
    }
    
    for(let j = 0; j < m; j++) {
        for(let i = 0; i < n; i++) {
            if(land[i][j] === 1 && !visited[i][j]) { // 석유가 존재한다면 dfs 탐색
                const [cnt, maxX] = bfs(i, j);
                
                for(let x = j; x <= maxX; x++) {
                    petroleum[x] += cnt;
                }
            }
        }
    }
    
    // console.log(petroleum);
    
    return Math.max(...petroleum);
}