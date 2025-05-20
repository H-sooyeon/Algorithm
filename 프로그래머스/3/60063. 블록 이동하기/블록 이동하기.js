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

function solution(board) {
    let answer = Number.MAX_SAFE_INTEGER;
    let left = [1, 1];
    let right = [1, 2];
    
    const n = board.length;
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    
    const visited = new Set();
    
    const queue = new Queue();
    queue.push([1, 1, 1, 2, 0]);
    visited.add('1,1,1,2');
    
    const isPossible = (y, x) => {
        if(y > n || x > n || y <= 0 || x <= 0) return false;
        if(board[y-1][x-1] === 1) return false;
        return true;
    }
    
    const makeVisitedStr = (ly, lx, ry, rx) => {
        return `${ly},${lx},${ry},${rx}`;
    }
    
    while(queue.size() > 0) {
        const [ly, lx, ry, rx, cost] = queue.front();
        queue.pop();
                
        if((ly === n && lx === n) || (ry === n && rx === n)) {
            answer = Math.min(cost, answer);
            continue;
        }
                
        // 일직선 이동
        for(let i = 0; i < 4; i++) {
            const nly = ly + dy[i];
            const nlx = lx + dx[i];
            
            const nry = ry + dy[i];
            const nrx = rx + dx[i];
            
            if(!isPossible(nly, nlx) || !isPossible(nry, nrx)) continue;
            const visitedKey = makeVisitedStr(nly, nlx, nry, nrx);
            if(visited.has(visitedKey)) continue;
            visited.add(visitedKey);
            queue.push([nly, nlx, nry, nrx, cost + 1]);
        }
        
        // 회전
        
        // 가로 방향일 때
        if(ly === ry) {
            // 왼쪽 위로 회전
            if(isPossible(ly - 1, lx) && isPossible(ly - 1, rx)) {
                const visitedKey = makeVisitedStr(ly, lx, ly - 1, lx); 
            
                if(!visited.has(visitedKey)) {
                    queue.push([ly, lx, ly - 1, lx, cost + 1]);
                    visited.add(visitedKey);
                }
            }
        
            // 오른쪽 위로 회전
            if(isPossible(ry - 1, rx) && isPossible(ly - 1, lx)) {
                const visitedKey = makeVisitedStr(ry, rx, ry - 1, rx); 
            
                if(!visited.has(visitedKey)) {
                    queue.push([ry, rx, ry - 1, rx, cost + 1]);
                    visited.add(visitedKey);
                }
            }
            
            // 왼쪽 아래 회전
            if(isPossible(ly + 1, lx) && isPossible(ry + 1, rx)) {
                const visitedKey = makeVisitedStr(ly + 1, lx, ly, lx); 
            
                if(!visited.has(visitedKey)) {
                    visited.add(visitedKey);
                    queue.push([ly + 1, lx, ly, lx, cost + 1]);
                }
            }
        
            // 오른쪽 아래 회전
            if(isPossible(ry + 1, rx) && isPossible(ly + 1, lx)) {
                const visitedKey = makeVisitedStr(ry + 1, rx, ry, rx); 
            
                if(!visited.has(visitedKey)) {
                    queue.push([ry + 1, rx, ry, rx, cost + 1]);
                    visited.add(visitedKey);
                }
            }
        }
        else { // 세로 방향일 때
            let verticalMove = [ly, lx, ry, rx];
            // if(ry > ly) verticalMove = [ly, lx, ry, rx];
            // else verticalMove = [ry, rx, ly, lx];
        
            const [nly, nlx, nry, nrx] = verticalMove;
            
            // 오른쪽 아래로 내리기
            if(isPossible(nry, nrx + 1) && isPossible(nly, nlx + 1)) {
                const visitedKey = makeVisitedStr(nly, nlx, nly, nlx + 1);
                
                if(!visited.has(visitedKey)) {
                    queue.push([nly, nlx, nly, nlx + 1, cost + 1]);
                    visited.add(visitedKey);
                }
            }
            
            // 왼쪽 아래로 내리기
            if(isPossible(nry, nrx - 1) && isPossible(nly, nlx - 1)) {
                const visitedKey = makeVisitedStr(nly, nlx - 1, nly, nlx);
                
                if(!visited.has(visitedKey)) {
                    queue.push([nly, nlx - 1, nly, nlx, cost + 1]);
                    visited.add(visitedKey);
                }
            }
            
            // 오른쪽 위로 올리기
            if(isPossible(nry, nrx + 1) && isPossible(nly, nlx + 1)) {
                const visitedKey = makeVisitedStr(nry, nrx, nry, nrx + 1);
                
                if(!visited.has(visitedKey)) {
                    queue.push([nry, nrx, nry, nrx + 1, cost + 1]);
                    visited.add(visitedKey);
                }
            }
            
            // 왼쪽 위로 올리기
            if(isPossible(nry, nrx - 1) && isPossible(nly, nlx - 1)) {
                const visitedKey = makeVisitedStr(nry, nrx - 1, nry, nrx);
                
                if(!visited.has(visitedKey)) {
                    queue.push([nry, nrx - 1, nry, nrx, cost + 1]);
                    visited.add(visitedKey);
                }
            }
        }
        
    }
    
    return answer;
}