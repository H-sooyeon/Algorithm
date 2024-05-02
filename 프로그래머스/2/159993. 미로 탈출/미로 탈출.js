class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    push(item) {
        this.items[this.tail] = item;
        this.tail++;
    }
    pop() {
        delete this.items[this.head];
        this.head++;
    }
    size() {
        return this.tail - this.head;
    }
    front() {
        return this.items[this.head];
    }
}

function solution(maps) {
    let dist_lever = 0;
    let answer = 0;
    let start = [];
    let end = [];
    let lever = [];
    
    let n = maps.length;
    let m = maps[0].length;
    let visited = Array.from({length: n}, () => Array(m).fill(0));
    
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
    
    maps.forEach((row, i) => {
        row.split('').forEach((v, idx) => {
            if(v === 'S') start = [i, idx];
            if(v === 'E') end = [i, idx];
            if(v === 'L') lever = [i, idx];
        })
    })
    
    const bfs = (s_y, s_x, target) => {
        visited.map((row) => row.fill(0));
        let queue = new Queue();
        queue.push([s_y, s_x]);
        
        while(queue.size()) {
            let [y, x] = queue.front();
            queue.pop();
            
            if(y === target[0] && x === target[1]) {
                return visited[y][x];
            }
            
            for(let i = 0; i < 4; i++) {
                let ny = y + dy[i];
                let nx = x + dx[i];
                
                if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
                if(visited[ny][nx] || maps[ny][nx] === 'X') continue;
                
                queue.push([ny, nx]);
                visited[ny][nx] = visited[y][x] + 1;
            }
        }
        
        return 0;
    }
    
    // lever까지 이동
    dist_lever += bfs(start[0], start[1], lever);
    if(!dist_lever) return -1;
    // 출구까지 이동
    answer += bfs(lever[0], lever[1], end);
    if(!answer) return -1;
    
    return answer + dist_lever;
}