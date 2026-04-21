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

// 맨헤튼 거리
// 출발 위치: x, y
// 탈출 지점: r, c
function solution(n, m, x, y, r, c, k) {
    const dir = ['d', 'l', 'r', 'u'];
    const dy = [1, 0, 0, -1];
    const dx = [0, -1, 1, 0];
    const visited = Array.from({length: n}, () => Array.from({length: m}, () => Array(k + 1).fill(false)));
    
    const minPath = Math.abs(y - c) + Math.abs(x - r)
    if(minPath > k) return 'impossible';
    if((k - minPath) % 2 === 1) return 'impossible';
    
    const queue = new Queue();
    queue.push([x - 1, y - 1, '']);
    visited[x - 1][y - 1][0] = true;
    
    while(queue.size()) {
        const [curY, curX, path] = queue.pop();
        
        if(curY === r - 1 && curX === c - 1 && k === path.length) {
            return path;
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = curY + dy[i];
            const nx = curX + dx[i];
            
            const calMinPath = Math.abs(ny - (r - 1)) + Math.abs(nx - (c - 1));
            
            if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
            if(visited[ny][nx][path.length + 1]) continue;
            // 지금부터 남은 최소 거리가 k보다 크다면 pass
            
            if(calMinPath + path.length > k) continue;
            if((calMinPath + path.length - k) % 2 === 1) continue;
            queue.push([ny, nx, path + dir[i]]);
            visited[ny][nx][path.length + 1] = true;
        }
    }
    
    return 'impossible';
}