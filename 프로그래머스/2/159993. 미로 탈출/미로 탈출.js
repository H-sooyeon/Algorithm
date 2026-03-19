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
// 레버를 당겼는지 아직인지에 대한 상태값
// X 벽으로는 지나갈 수 없음
// 길은 여러 번 지날 수 있음
// 레버를 당기지 않은 상태에서는 같은 길을 지나면 안됨
// 레버를 당긴 상태에서만 같은 길을 지날 수 있음
function solution(maps) {
    const copy = maps.map((row) => row.split(''));
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const [n, m] = [maps.length, maps[0].length];
    const k = 2; // 상태 (0: 레버 미작동 방문, 1: 레버 작동 후 방문)
    let start = [];
    
    const visited = Array.from({ length: n }, () => 
        Array.from({ length: m }, () => Array(k).fill(false))
    );
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(copy[i][j] === 'S') {
                start = [i, j];
                break;
            }
        }
        if(start.length) break;
    }
    
    const queue = new Queue();
    queue.push([...start, 0, 0]);
    visited[start[0]][start[1]][0] = true;
    
    while(queue.size()) {
        let [y, x, dist, leverState] = queue.pop();
        
        if(copy[y][x] === 'E' && leverState) {
            return dist;
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
            if(copy[ny][nx] === 'X') continue;
            // 레버를 당긴 상태에서 중복된 곳을 가는게 아니면 continue
            
            let nextLeverState = leverState;
            if(copy[ny][nx] === 'L') {
                nextLeverState = 1;
            }
            
            if(!visited[ny][nx][nextLeverState]) {
                queue.push([ny, nx, dist + 1, nextLeverState]);
                visited[ny][nx][nextLeverState] = true;
            }
        }
    }
    
    return -1;
}