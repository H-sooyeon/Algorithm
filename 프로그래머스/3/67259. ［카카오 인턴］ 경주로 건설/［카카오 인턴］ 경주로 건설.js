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
    const INF = Number.MAX_SAFE_INTEGER;
    let answer = INF;
    const n = board.length;
    
    // 우 하 좌 상
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    const visited = Array.from({length: n}, () => Array.from({length: n}, () => new Array(4).fill(INF)));
    
    const queue = new Queue();
    queue.push([0, 0, 0, 0]);
    queue.push([0, 0, 1, 0]);
    while(queue.size()) {
        const [y, x, dir, cost] = queue.pop();
        
        if(y === n-1 && x === n-1) {
            answer = Math.min(cost, answer);
            continue;
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= n || nx < 0) continue;
            if(board[ny][nx] === 1) continue;
            // 반대방향은 못가게
            if((dir === 0 && i === 2) ||(dir === 1 && i === 3) || (dir === 2 && i === 0) || (dir === 3 && i === 1)) continue
            
            let newCost = cost;
            // 코너
            if(dir !== i) newCost += 500;

            newCost += 100;
            if(visited[ny][nx][i] > newCost) {
                queue.push([ny, nx, i, newCost]);
                visited[ny][nx][i] = newCost;
            }
        }
    }
    
    return answer;
}