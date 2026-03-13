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

function solution(x, y, n) {
    let answer = -1;
    const queue = new Queue();
    const visited = new Array(1000001).fill(false);
    
    queue.push([0, x]);
    
    while(queue.size()) {
        const [operCnt, value] = queue.pop();
        
        if(value === y) {
            answer = operCnt;
            break;
        }
        
        if(value + n <= y && !visited[value + n]) {
            queue.push([operCnt + 1, value + n]);
            visited[value + n] = true;
        }
        if(value * 2 <= y && !visited[value * 2]) {
            queue.push([operCnt + 1, value * 2]);
            visited[value * 2] = true;
        }
        if(value * 3 <= y && !visited[value * 3]) {
            queue.push([operCnt + 1, value * 3]);
            visited[value * 3] = true;
        } 
    }
    
    return answer;
}