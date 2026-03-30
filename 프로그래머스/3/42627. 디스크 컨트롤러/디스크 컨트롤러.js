class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this.bubbleUp();
    }
    pop() {
        if(this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return top;
    }
    compare(a, b) {
        if (a.duration !== b.duration) return a.duration - b.duration;
        if (a.start !== b.start) return a.start - b.start;
        return a.id - b.id;
    }
    bubbleUp() {
        // 작업의 소요시간이 짧은 것 > 작업의 요청 시각이 빠른 것 > 작업의 번호가 작은 것
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            // 부모보다 내 우선순위가 더 높으면 위로 교체
            if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else break;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        while(true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let smallest = index;
            
            if(left < len && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if(right < len && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            
            if(smallest === index) break;
            
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    peak() {
        return this.heap[0];
    }
}

// 대기 큐가 비어있지 않다면 대기 큐에서 우선순위가 높은 작업을 꺼내 실행
// 작업의 소요시간이 짧은 것 > 작업의 요청 시각이 빠른 것 > 작업의 번호가 작은 것
function solution(jobs) {    
    jobs = jobs.sort((a, b) => a[0] - b[0]);
    
    const waiting = new PriorityQueue();
    let time = 0;
    let completedJobs = 0;
    let jobIdx = 0;
    let answer = 0;
    
    while(completedJobs < jobs.length) {
        // 현재 시간까지 요청된 모든 작업을 저장
        while(jobIdx < jobs.length && jobs[jobIdx][0] <= time) {
            waiting.push({start: jobs[jobIdx][0], duration: jobs[jobIdx][1]});
            jobIdx += 1;
        }
        
        if(!waiting.isEmpty()) {
            // 가장 짧은 작업 수행
            const current = waiting.pop();
            time += current.duration;
            answer += (time - current.start);
            completedJobs += 1;
        }
        else {
            // 대기 중인 작업이 없다면 다음 작업의 요청 시각으로 점프
            time = jobs[jobIdx][0];
        }
    }
        
    return Math.floor(answer / jobs.length);
}