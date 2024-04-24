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

function solution(board) {
    let answer = 0;
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
    
    let n = board.length;
    let m = board[0].length;
        
    let cur = [0,0];
    let flag = false;
    board = board.map((v, idx) => {
        let result = v.split('');
        
        for(let i = 0; i < result.length; i++) {
            if(flag) break;
            if(result[i] === 'R') {
                cur = [idx, i];
                flag = true;
                break;
            }
        }
        return result;
    });
    
    let visited = Array.from(Array(n), () => Array(m).fill(false));
    let visited_cnt = 0;
    
    const isValid = (ny, nx) => {
        if(ny >= n || ny < 0 || nx >= m || nx < 0 || board[ny][nx] === 'D') return false;
        return true;
    }

    const bfs = () => {
        const queue = new Queue();
        queue.push([cur[0], cur[1], 0]);
        visited[cur[0]][cur[1]] = true;
        
        // 시작 지점부터 시작
        while(queue.size()) {
            let size = queue.size();
            
            // 가던 길이 앞이 막혀있거나 D인 위치부터 시작
            for(let t = 0; t < size; t++) {
                let [y, x, cnt] = queue.front();
                queue.pop();
            
                // 방향 탐색
                for(let i = 0; i < 4; i++) {
                    let ny = y + dy[i];
                    let nx = x + dx[i];
                
                    // 미끄러지기
                    while(isValid(ny, nx)) {
                        ny += dy[i];
                        nx += dx[i];
                    }
                
                    // 현재 위치
                    ny -= dy[i];
                    nx -= dx[i];
                
                    if(board[ny][nx] === 'G') {
                        answer = cnt + 1;
                        return;
                    }
                
                    if(!visited[ny][nx]) {
                        visited[ny][nx] = true;
                        queue.push([ny, nx, cnt + 1]);
                    }
                }
            }
        }
    }
    
    bfs();
    
    if(!answer) return -1;
    return answer;
}