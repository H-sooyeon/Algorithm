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

function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 0;
    const graph = Array.from({length: 101}, () => new Array(101).fill(0));
    const n = 100;
    
    rectangle.forEach((position) => {
        const [lbx, lby, rtx, rty] = position.map((p) => p * 2);
        
        // 도형의 변은 1로 채우기
        for(let i = lbx; i <= rtx; i++) { // 가로
            if(graph[lby][i] !== 2) graph[lby][i] = 1;
            if(graph[rty][i] !== 2) graph[rty][i] = 1;
        }
        for(let i = lby; i <= rty; i++) { // 세로
            if(graph[i][lbx] !== 2) graph[i][lbx] = 1;
            if(graph[i][rtx] !== 2) graph[i][rtx] = 1;
        }
        
        // 내부는 2로 채우기
        for(let i = lby + 1; i < rty; i++) {
            for(let j = lbx + 1; j < rtx; j++) {
                graph[i][j] = 2;
            }
        }
    });
    
    // bfs로 더 빨리 아이템 찾기
    const dy = [0, 1, -1, 0];
    const dx = [1, 0, 0, -1];
    const visited = Array.from({length: 101}, () => new Array(101).fill(false));
    const queue = new Queue();
    
    queue.push([characterY * 2, characterX * 2, 0]);
    visited[characterY * 2][characterX * 2] = true;
    
    while(queue.size()) {
        const [y, x, cost] = queue.pop();
        
        if(y === itemY * 2 && x === itemX * 2) {
            // console.log(y, x, itemY, itemX, cost);
            return cost / 2;
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = dy[i] + y;
            const nx = dx[i] + x;
            
            if(ny > n || nx > n || ny < 0 || nx < 0) continue;
            if(visited[ny][nx] || graph[ny][nx] !== 1) continue;
            
            queue.push([ny, nx, cost + 1]);
            visited[ny][nx] = true;
        }
    }
    
    return answer;
}