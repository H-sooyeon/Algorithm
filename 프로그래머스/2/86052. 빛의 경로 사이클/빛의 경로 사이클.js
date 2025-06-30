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
    size() {
        return this.tail - this.head;
    }
    front() {
        return this.items[this.head];
    }
}

function solution(grid) {
    let answer = [];
    const n = grid.length;
    const m = grid[0].length;
    const cycle = Array.from({length: n}, () => Array.from({length: m}, () => Array(4).fill(false)));
    // 상하좌우
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const direction = {
        TOP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3,
    }
    
    // 모든 노드에 대해 4방향으로 빛을 쏘아 순환 경로를 확인한다.
    // 순환 경로 중 같은 경로가 있다면 같은 사이클이 만들어진 것이므로 반복 중단(1사이클)
    
    const queue = new Queue();
    // 모든 노드에 대해 4방향 빛을 쏘아 순환 (빛이 나가는 방향 기준)
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            for(let d = 0; d < 4; d++) {
                queue.push([i, j, d]);
                let cnt = 0;
                
                while(queue.size() > 0) {
                    let [row, col, dir] = queue.front();
                    queue.pop();
                    
                    cycle[row][col][dir] = true;
                    cnt += 1;
                    
                    switch(grid[row][col]) {
                        case 'S':
                            switch(dir) {
                                case direction.LEFT:
                                    col -= 1;
                                    break;
                                case direction.RIGHT:
                                    col += 1;
                                    break;
                                case direction.TOP:
                                    row -= 1;
                                    break;
                                case direction.DOWN:
                                    row += 1;
                                    break;
                            }
                            break;
                        case 'L':
                            switch(dir) {
                                case direction.LEFT:
                                    row += 1;
                                    dir = direction.DOWN;
                                    break;
                                case direction.RIGHT:
                                    dir = direction.TOP;
                                    row -= 1;
                                    break;
                                case direction.TOP:
                                    dir = direction.LEFT;
                                    col -= 1;
                                    break;
                                case direction.DOWN:
                                    dir = direction.RIGHT;
                                    col += 1;
                                    break;
                            }
                            break;
                        case 'R':
                            switch(dir) {
                                case direction.LEFT:
                                    row -= 1;
                                    dir = direction.TOP;
                                    break;
                                case direction.RIGHT:
                                    row += 1;
                                    dir = direction.DOWN;
                                    break;
                                case direction.TOP:
                                    col += 1;
                                    dir = direction.RIGHT;
                                    break;
                                case direction.DOWN:
                                    col -= 1;
                                    dir = direction.LEFT;
                                    break;
                            }
                            break;
                    }
                    
                    if(row === n) {
                        row = 0;
                    }
                    if(col === m) {
                        col = 0;
                    }
                    if(row === -1) {
                        row = n - 1;
                    }
                    if(col === -1) {
                        col = m - 1;
                    }
                    
                    if(row === i && col === j && dir === d) {
                        answer.push(cnt);
                        break;
                    }
                    else if(cycle[row][col][dir]) {
                        break;
                    }
                    else {
                        queue.push([row, col, dir]);
                    }
                }
            }
        }
    }
    
    // console.log(answer);
    
    return answer.sort((a, b) => a - b);
}