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

function solution(land) {
    let n = land.length;
    let m = land[0].length;
    
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
        
    // dfs 돌렸을 때 시작 r 값과 끝 r 값을 같이 저장
    let min_x = m + 1;
    let max_x = -1;
    
    const bfs = (y, x) => {
        let cnt = 0;
        let queue = new Queue();
        queue.push([y, x]);
        land[y][x] = 0;
        
        while(queue.size()) {
            let [cur_y, cur_x] = queue.front();
            queue.pop();
            cnt++;
            
            min_x = Math.min(min_x, cur_x);
            max_x = Math.max(max_x, cur_x);
            
            for(let i = 0; i < 4; i++) {
                let ny = cur_y + dy[i];
                let nx = cur_x + dx[i];
                
                if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
                if(!land[ny][nx]) continue;
                
                land[ny][nx] = 0;

                queue.push([ny, nx]);
            }
        }
        
        return cnt;
    }
    
    let get_mass = [];
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(land[i][j]) {
                min_x = m + 1;
                max_x = -1;
                let cnt = bfs(i, j);
                get_mass.push({start: min_x, end: max_x, cnt: cnt});
            }
        }
    }
        
    let land_oil = new Array(m).fill(0);
    for(let {start, end, cnt} of get_mass) {
        for(let i = start; i <= end; i++) {
            land_oil[i] += cnt;
        }
    }
            
    return Math.max(...land_oil);
}