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
    front() {
        return this.items[this.head];
    }
}

function solution(queue1, queue2) {
    let answer = 0;
    
    let queue1_arr = new Queue();
    let queue2_arr = new Queue();
    
    let queue1_sum = queue1.reduce((acc, cur) => {
        queue1_arr.push(cur);
        return acc + cur;
    }, 0);
    let queue2_sum = queue2.reduce((acc, cur) => {
        queue2_arr.push(cur);
        return acc + cur;
    }, 0);
    
    if(queue1_sum === queue2_sum) return 0;
    if((queue1_sum + queue2_sum) % 2 === 1) return -1;
    
    let total = queue1_sum + queue2_sum;
    
    let loop = queue1.length * 3 - 3;
    while(queue1_sum !== queue2_sum) {
        if(answer > loop) return -1;
        
        if(queue1_sum < queue2_sum) {
            let value = queue2_arr.front();
            queue2_arr.pop();
            queue1_arr.push(value);
            queue1_sum += value;
            queue2_sum -= value;
        }
        else {
            let value = queue1_arr.front();
            queue1_arr.pop();
            queue2.push(value);
            queue1_sum -= value;
            queue2_sum += value;
        };
        
        answer++;
    }
        
    return answer;
}