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

// request[i]의 길이가 1이면 지게차를 이용한 출고 요청
// 2이면 크레인을 이용한 출고 요청
function solution(storage, requests) {
    let answer = storage.length * storage[0].length;
    const copyStorage = storage.map((row) => row.split(''));
    const alphaCnt = new Array(26).fill(0);
    const n = storage.length;
    const m = storage[0].length;
    const deleteBox = new Set();
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            const code = storage[i][j].charCodeAt() - 'A'.charCodeAt();
            alphaCnt[code] += 1;
        }
    }
    
    const bfs = (target) => {
        const queue = new Queue();
        const visited = Array.from({length: n}, () => Array(m).fill(false));
        
        // 바깥 부분 탐색
        for(let i = 0; i < n; i++) {
            queue.push([i, -1]);
            queue.push([i, m]);
        }
        for(let j = 1; j < m - 1; j++) {
            queue.push([-1, j]);
            queue.push([n, j]);
        }
        
        while(queue.size()) {
            const [y, x] = queue.pop();
            
            for(let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                
                if(ny >= n || nx >= m || ny < 0 || nx < 0) continue;
                if(visited[ny][nx]) continue;
                
                visited[ny][nx] = true;
                if(copyStorage[ny][nx] === target) {
                    deleteBox.add(`${ny},${nx}`);
                }
                if(copyStorage[ny][nx] === null) {
                    queue.push([ny, nx]);
                }
            }
        }
    }
    
    for(let request of requests) {
        const code = request[0].charCodeAt();
        if(alphaCnt[code] <= 0) continue;
        
        if(request.length === 2) {
            for(let i = 0; i < n; i++) {
                for(let j = 0; j < m; j++) {
                    if(copyStorage[i][j] === request[0]) {
                        copyStorage[i][j] = null;
                        answer -= 1;
                        alphaCnt[code] -= 1;
                    }
                }
            }
        } else {
            // bfs로 지우기
            bfs(request[0]);
            
            for(let box of deleteBox) {
                const [y, x] = box.split(',');
                const code = copyStorage[y][x].charCodeAt();
                
                copyStorage[y][x] = null;
                answer -= 1;
                alphaCnt[code] -= 1;
            }
            deleteBox.clear();
        }
    }
    
    return answer;
}