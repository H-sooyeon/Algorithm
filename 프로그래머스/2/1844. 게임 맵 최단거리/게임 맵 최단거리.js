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

function solution(maps) {
    let answer = 0;
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
    let n = maps.length;
    let m = maps[0].length;
    let visited = Array.from(Array(n), () => Array(m).fill(0));
    
    let queue = new Queue();
    queue.push([0, 0]);
    
    while(queue.size()) {
        let [y, x] = queue.front();
        queue.pop();
        
        if(y === n - 1 && x === m - 1) {
            return visited[y][x] + 1;
        }
        
        for(let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
            if(visited[ny][nx] || !maps[ny][nx]) continue;
            
            queue.push([ny, nx]);
            visited[ny][nx] = visited[y][x] + 1;
        }
    }
    
    return -1;
}