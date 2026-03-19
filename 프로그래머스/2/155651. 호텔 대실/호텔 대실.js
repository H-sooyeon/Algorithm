class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this.bubbleUp();
    }
    pop() {
        if(this.heap.length === 1) return this.heap.pop();
        const item = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return item;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.heap[index] > this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        
        while(true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let smallest = index;
            
            if(left < len && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if(right < len && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if(smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    size() {
        return this.heap.length;
    }
    peak() {
        return this.heap[0];
    }
}

// 한 번 사용한 객실은 퇴실 시간을 기준으로 10분간 청소
function solution(book_time) {
    let answer = 0;
    let times = [];
    
    const convertTimeToMin = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        return hh * 60 + mm;
    }
    
    const waiting = [];
    // 대기 중인(사용 중인) 방을 다음 방 확인 전까지 확인해서 
    for(let book of book_time) {
        const [start, end] = book;
        
        const startTime = convertTimeToMin(start);
        const endTime = convertTimeToMin(end) + 10;
        
        times.push([startTime, endTime]);
    }
    
    times = times.sort((a, b) => a[0] - b[0]);
    const minHeap = new MinHeap();
    
    for(let time of times) {
        const [start, end] = time;
        
        if(minHeap.isEmpty()) {
            minHeap.push(end);
            if(answer === 0) answer += 1; 
        }
        else {
            // 현재 시간 기준 퇴실 가능한 방은 대기에서 제거
            while(true) {
                const waitting = minHeap.peak();
                
                // 퇴실 시간이 현재 방의 입실 시간보다 빠르다면 대기에서 제거
                if(waitting <= start) {
                    minHeap.pop();
                } else break;
            }
            
            // 대기 중인 방이 현재 제공하는 방의 개수 이상일 때 방 추가
            if(minHeap.size() >= answer) {
                answer += 1;
            }
            
            // 현재 방 대기열에 추가
            minHeap.push(end);
        }
    }
        
    return answer;
}