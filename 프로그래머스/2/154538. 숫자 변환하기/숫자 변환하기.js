class Queue {
	constructor() {
		this.items = {};
		this.head = 0;
		this.tail = 0;
	}
	enqueue(item) {
		this.items[this.tail] = item;
		this.tail++;
	}
	dequeue() {
		const item = this.items[this.head];
		delete this.items[this.head];
		this.head++;
		return item;
	}
	size() {
		return this.tail - this.head;
	}
}

function solution(x, y, n) {
    const MAX = 1000000;
    let answer = -1;
    
    const bfs = () => {
        let visited = new Array(MAX + 1).fill(false);
        let queue = new Queue();
        queue.enqueue([x, 0]);
    
        while(queue.size()) {
            let [cur, cnt] = queue.dequeue();
        
            if(visited[cur]) continue;
            visited[cur] = true;
        
            if(cur === y) {
                answer = cnt;
                return;
            }

            if(cur + n <= MAX && !visited[cur + n])
                queue.enqueue([cur + n, cnt + 1]);
                
            if(cur * 2 <= MAX && !visited[cur * 2])
                queue.enqueue([cur * 2, cnt + 1]);
                
            if(cur * 3 <= MAX && !visited[cur * 3]) 
                queue.enqueue([cur * 3, cnt + 1]);
        }
    }
    
    bfs();
    
    return answer;
}