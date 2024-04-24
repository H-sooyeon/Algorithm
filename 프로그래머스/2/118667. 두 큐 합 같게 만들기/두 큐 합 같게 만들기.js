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
    size() {
        return this.tail - this.head;
    }
}

function solution(queue1, queue2) {
    let answer = 0;
    
    let q1 = new Queue();
    let q2 = new Queue();
    
    let q1_sum = queue1.reduce((acc, cur) => {
        q1.push(cur);
        return cur + acc;
    }, 0)
    
    let q2_sum = queue2.reduce((acc, cur) => {
        q2.push(cur);
        return cur + acc;
    }, 0);
    
    let total = q1_sum + q2_sum;
    
    if(q1_sum === q2_sum) return 0;
    if(total % 2 === 1) return -1;
    
    // queue1 * 3번 반복되면 다시 원점으로 돌아감
    for(let i = 0; i < queue1.length * 3; i++) {
        if(q1_sum < q2_sum) {
            let v = q2.front();
            q1.push(v);
            
            q1_sum += v;
            q2_sum -= v;
            
            q2.pop();
            
            answer++
        }
        else if(q1_sum > q2_sum) {
            let v = q1.front();
            q2.push(v);
            
            q2_sum += v;
            q1_sum -= v;
            
            q1.pop();
            
            answer++;
        }
        
        if(q1_sum === q2_sum) {
            return answer;
        }
    }
    
    
    
    return -1;
}