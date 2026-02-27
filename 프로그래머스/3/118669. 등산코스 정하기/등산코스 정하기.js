class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(value) {
        this.heap.push(value);
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
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while(true) {
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let smallest = index;
            
            if(left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if(right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if(smallest === index) break;
            
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

function solution(n, paths, gates, summits) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [a, b, w] of paths) {
        graph[a].push([b, w]);
        graph[b].push([a, w]);
    }

    // 봉우리 여부를 빠르게 확인하기 위한 Set
    const isSummit = new Array(n + 1).fill(false);
    for (const s of summits) isSummit[s] = true;

    // intensity를 저장할 배열 (최솟값을 찾아야 하므로 INF로 초기화)
    const INF = Infinity;
    const intensity = new Array(n + 1).fill(INF);
    const pq = new MinHeap(); // 기존에 작성하신 MinHeap 사용

    // 모든 출입구를 시작점으로 한꺼번에 넣기 (Multi-source Dijkstra)
    for (const gate of gates) {
        intensity[gate] = 0;
        pq.push([0, gate]);
    }

    while (!pq.isEmpty()) {
        const [dist, now] = pq.pop();

        // 현재 봉우리에 도달했다면 더 이상 이동하지 않음 (규칙)
        if (isSummit[now]) continue;
        
        // 이미 더 작은 intensity로 방문했다면 패스
        if (intensity[now] < dist) continue;

        for (const [next, weight] of graph[now]) {
            // 이번 경로의 intensity는 (지금까지의 max intensity)와 (현재 간선) 중 큰 값
            const nextIntensity = Math.max(dist, weight);

            if (nextIntensity < intensity[next]) {
                intensity[next] = nextIntensity;
                pq.push([nextIntensity, next]);
            }
        }
    }

    // 결과 구하기: 봉우리 번호가 낮은 순, intensity가 낮은 순
    summits.sort((a, b) => a - b);
    let minIntensity = INF;
    let resultSummit = -1;

    for (const s of summits) {
        if (intensity[s] < minIntensity) {
            minIntensity = intensity[s];
            resultSummit = s;
        }
    }

    return [resultSummit, minIntensity];
}