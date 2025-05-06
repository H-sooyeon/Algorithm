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

function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 987654321;
    const board = Array.from({length:101}, () => Array(101).fill(0));
    const visited = Array.from({length:101}, () => Array(101).fill(false));
    const [newChaX, newChY] = [characterX * 2, characterY * 2];
    const [newItemX, newItemY] = [itemX * 2, itemY * 2];
    
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    
    rectangle.forEach((rec) => {
        const [lbx, lby, rtx, rty] = rec.map((el) => el * 2);
        
        // 바닥
        for(let j = lbx; j <= rtx; j++) {
            if(board[lby][j] !== -1) {
                board[lby][j] = 1;
            }
        }
        // 왼쪽
        for(let i = lby; i <= rty; i++) {
            if(board[i][lbx] !== -1) {
                board[i][lbx] = 1;
            }
        }
        // 오른쪽
        for(let i = lby; i <= rty; i++) {
            if(board[i][rtx] !== -1) {
                board[i][rtx] = 1;
            }
        }
        // 위쪽
        for(let j = lbx; j <= rtx; j++) {
            if(board[rty][j] !== -1) {
                board[rty][j] = 1;
            }
        }
        // 내부
        for(let i = lby + 1; i <= rty - 1; i++) {
            for(let j = lbx + 1; j <= rtx - 1; j++) {
                board[i][j] = -1;
            }
        }
    })
    
    const bfs = (startY, startX) => {
        const queue = new Queue();
        queue.push([startY, startX, 0]);
        
        while(queue.size() > 0) {
            const [y, x, cost] = queue.front();
            queue.pop();
            
            if(y === newItemY && x === newItemX) {
                answer = Math.min(answer, cost / 2);
            }
            
            for(let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                
                if(ny >= 101 || nx >= 101 || ny <= 0 || nx <= 0) continue;
                if(board[ny][nx] !== 1 || visited[ny][nx]) continue;
                
                queue.push([ny, nx, cost + 1]);
                visited[y][x] = true;
            }
        }
    }
    
    bfs(newChY, newChaX);
    
    return answer;
}