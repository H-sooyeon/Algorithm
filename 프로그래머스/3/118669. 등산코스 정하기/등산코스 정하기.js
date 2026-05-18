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
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        
        return top;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            
            if(this.heap[parentIdx][1] < this.heap[index][1]) break;
            
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    }
    bubbleDown() {
        let index = 0;
        const len = this.heap.length;
        
        while(true) {
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let smallest = index;
            
            if(left < len && this.heap[left][1] < this.heap[smallest][1]) {
                smallest = left;
            }
            if(right < len && this.heap[right][1] < this.heap[smallest][1]) {
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
}

// 쉼터, 산봉우리를 방문할 때마다 휴식을 취할 수 있다.
// 휴식 없이 이동해야 하는 시간 중 가장 긴 시간 반환(intensity)
// 산봉우리 중 한 곳만 방문해 원래의 출입구로 돌아온다.

// paths: 등산로의 정보 2차원 배열 [i, j, w]
// gates: 출입구 번호 배열
// summits: 산봉우리 번호 배열
function solution(n, paths, gates, summits) {
    let answer = [];
    const adj = Array.from({length: n + 1}, () => new Array());
    const nodes = new Array(n + 1).fill(0); // 출입구 1, 산봉우리 2, 일반 0
    
    gates.forEach((gate) => nodes[gate] = 1);
    summits.forEach((summit) => nodes[summit] = 2);
    
    for(let [i, j, w] of paths) {
        adj[i].push([j, w]);
        adj[j].push([i, w]);
    }
    
    // 모든 gate를 한 번에 다 넣어 빠른 탐색
    const queue = new MinHeap();
    const intensities = new Array(n + 1).fill(Infinity);
    
    for(let gate of gates) {
        intensities[gate] = 0;
        queue.push([gate, 0]);
    }
    
    while(!queue.isEmpty()) {
        const [cur, curIntensity] = queue.pop();
        
        // 현재 기록된 intensity가 기록된 intensity보다 크다면 pass
        if(curIntensity > intensities[cur]) continue;
        // 산봉우리에 도달했다면 pass
        if(nodes[cur] === 2) continue;
        
        for(let [next, weight] of adj[cur]) {
            if(nodes[next] === 1) continue;
            
            const nextIntensity = Math.max(curIntensity, weight);
            if(nextIntensity < intensities[next]) {
                queue.push([next, nextIntensity]);
                intensities[next] = nextIntensity;
            }
        }
    }
    
    // console.log(intensities);
    summits.sort((a, b) => a - b);
    answer = [summits[0], intensities[summits[0]]];
    
    for(let summit of summits) {
        if(answer[1] > intensities[summit]) {
            answer = [summit, intensities[summit]];
        }
    }
    
    return answer;
    // [산봉우리의 번호, Intensity의 최솟값]
}