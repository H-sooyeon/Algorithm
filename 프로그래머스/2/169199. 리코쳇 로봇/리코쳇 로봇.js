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

function solution(board) {
    let answer = -1;
    board = board.map((row) => row.split(''));
    const n = board.length;
    const m = board[0].length;
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    
    let start = null;
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(board[i][j] === 'R') {
                start = [i, j, 0];
                break;
            }
        }
        if(start) break;
    }
    
    const queue = new Queue();
    queue.push(start);
    visited[start[0]][start[1]] = true;
    
    while(queue.size()) {
        const [y, x, dist] = queue.pop();
        
        if(board[y][x] === 'G') return dist;
        
        for(let i = 0; i < 4; i++) {
            let ny = y;
            let nx = x;
            
            // 장애물이나 벽을 만날 때까지 미끄러짐
            while(true) {
                let nextY = ny + dy[i];
                let nextX = nx + dx[i];
                
                if(nextY >= 0 && nextY < n && nextX >= 0 && nextX < m && board[nextY][nextX] !== 'D') {
                    ny = nextY;
                    nx = nextX;
                } else {
                    // 더 못가면 그 자리에 멈춤
                    break;
                }
            }
            
            if(!visited[ny][nx]) {
                queue.push([ny, nx, dist + 1]);
                visited[ny][nx] = true;
            }
        }
    }
    
    
    return answer;
}