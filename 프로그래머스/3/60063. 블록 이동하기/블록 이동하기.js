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
    let answer = Number.MAX_SAFE_INTEGER;
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
    const n = board.length;
    let new_board = Array.from({length: n + 2}, () => Array(n + 2).fill(-1));
    let visited = new Set();
    const arrive = `${board.length},${board.length}`;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            new_board[i+1][j+1] = board[i][j];
        }
    }
    
    const isValidate = (left, right, ny, nx) => {
        const left_pos = [left[0] + ny, left[1] + nx];
        const right_pos = [right[0] + ny, right[1] + nx];
        
        if(left_pos[0] > n || left_pos[1] > n || left_pos[0] < 1 || left_pos[1] < 1) return false;
        if(right_pos[0] > n || right_pos[1] > n || right_pos[0] < 1 || right_pos[1] < 1) return false;
        
        const pos = left_pos.join(',') + ',' + right_pos.join(',');
        
        if(visited.has(pos)) return false;
        if(new_board[left_pos[0]][left_pos[1]] === 1) return false;
        if(new_board[right_pos[0]][right_pos[1]] === 1) return false;
        
        return true;
    }
    
    let queue = new Queue();
    queue.push([[1,1], [1,2], 0]);
    
    while(queue.size()) {
        const [left, right, cnt] = queue.front();
        queue.pop();
        
        if(left.join(',') === arrive || right.join(',') === arrive) {
            answer = Math.min(cnt, answer);
            continue;
        }
        
        // 상하좌우 이동
        for(let i = 0; i < 4; i++) {
            const ny = dy[i];
            const nx = dx[i];
            
            if(isValidate(left, right, ny, nx)) {
                const next_left = [left[0] + ny, left[1] + nx];
                const next_right = [right[0] + ny, right[1] + nx];
                
                queue.push([next_left, next_right, cnt + 1]);
                const key = next_left.join(',') + ',' + next_right.join(',');
                visited.add(key);
            }
        }
        
        // 회전
        // left와 right의 y값이 같으면 수평으로 나열되어 있는 것
        // y 값이 다르면 수직으로 나열되어 있는 것
        if(left[0] === right[0]) {
            // 하단으로 회전, 오른쪽 기준, 아래 두 칸이 0이라면 회전 가능
            if(left[0] + 1 <= n && new_board[left[0] + 1][left[1]] === 0 && new_board[right[0] + 1][right[1]] === 0) {
                let key = right.join(',') + `,${right[0] + 1},${right[1]}`;
                if(!visited.has(key)) {
                    queue.push([[right[0] + 1, right[1]], right, cnt + 1]);
                    visited.add(key);
                }
                // 왼쪽 기준으로 회전
                key = left.join(',') + `,${left[0] + 1},${left[1]}`;
                if(!visited.has(key)) {
                    queue.push([left, [left[0] + 1, left[1]], cnt + 1]);
                    visited.add(key);
                }
            }
            // 위로 회전
            if(left[0] - 1 >= 1 && new_board[left[0] - 1][left[1]] === 0 && new_board[right[0] - 1][right[1]] === 0) {
                let key = `${right[0] - 1},${right[1]},` + right.join(',');
                if(!visited.has(key)) {
                    queue.push([[right[0] - 1, right[1]], right, cnt + 1]);
                    visited.add(key);
                }
                // 왼쪽 기준으로 회전
                key = left.join(',') + `,${left[0] - 1},${left[1]}`;
                if(!visited.has(key)) {
                    queue.push([left, [left[0] - 1, left[1]], cnt + 1]);
                    visited.add(key);
                }
            }
        }
        else {
            // 왼쪽으로 회전
            if(left[1] - 1 >= 1 && new_board[left[0]][left[1] - 1] === 0 && new_board[right[0]][right[1] - 1] === 0) {
                let key = `${right[0]},${right[1] - 1},` + right.join(',');
                if(!visited.has(key)) {
                    queue.push([[right[0], right[1] - 1], right, cnt + 1]);
                    visited.add(key);
                }
                key = `${left[0]},${left[1] - 1},` + left.join(',');
                if(!visited.has(key)) {
                    queue.push([[left[0], left[1] - 1], left, cnt + 1]);
                    visited.add(key);
                }
            }
            // 오른쪽으로 회전
            if(left[1] + 1 <= n && new_board[left[0]][left[1] + 1] === 0 && new_board[right[0]][right[1] + 1] === 0) {
                let key = `${right[0]},${right[1] + 1},` + right.join(',');
                if(!visited.has(key)) {
                    queue.push([[right[0], right[1] + 1], right, cnt + 1]);
                    visited.add(key);
                }
                key = `${left[0]},${left[1] + 1},` + left.join(',');
                if(!visited.has(key)) {
                    queue.push([[left[0], left[1] + 1], left, cnt + 1]);
                    visited.add(key);
                }
            }
        }
    }
    
    return answer;
}