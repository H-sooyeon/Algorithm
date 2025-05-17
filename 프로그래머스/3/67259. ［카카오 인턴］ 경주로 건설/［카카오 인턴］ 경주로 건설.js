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

// 직선 도로를 만들 때는 100원 소요
// 코너 만들 때는 500원 소요
function solution(board) {
    const INF = Number.MAX_SAFE_INTEGER
    let answer = INF;
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1]; // 상 하 좌 우
    const n = board.length;
    const visited = Array.from({length: n}, () => Array.from({length: n}, () => Array(4).fill(INF)));
    
    const isPossible = (y, x) => {
        if(y >= n || x >= n || y < 0 || x < 0) return false;
        if(board[y][x] === 1) return false;
        
        return true;
    }
    
    const queue = new Queue();
    queue.push([0, 0, 3, 0]); // y, x, dir, cost
    queue.push([0, 0, 1, 0]);
    
    visited[0][0][3] = true;
    visited[0][0][1] = true;
    
    while(queue.size() > 0) {
        const [y, x, dir, cost] = queue.front();
        queue.pop();
        
        // visited[y][x][dir] = true;
        if(y === n - 1 && x === n - 1) {
            answer = Math.min(cost, answer);
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            // if(y === 4 && x === 4 && ny === 5 && nx === 4) {
            //     console.log(isPossible(ny, nx));
            //     if(isPossible(ny, nx)) {
            //         console.log(visited[ny][nx][i]);
            //     }
            // }
            
            if(!isPossible(ny, nx)) continue;
            if((dir === 0 && i === 1) || (dir === 2 && i === 3) || (dir === 1 && i === 0) || (dir === 3 && i === 2)) continue;
            
            
            let coin = 100;
            // 0상 1하 2좌 3우
            if(dir !== i) {
                coin += 500;
            }
            
            if(visited[ny][nx][i] <= coin + cost) continue;
            
            // console.log('y', y, 'x', x, 'dir', dir, 'ny', ny, 'nx', nx, 'i', i, 'coin', coin, 'cost', cost);
            queue.push([ny, nx, i, cost + coin]);
            visited[ny][nx][i] = cost + coin;
            
        }
    }
    
    return answer;
}