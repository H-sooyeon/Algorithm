function solution(n, wires) {
    let minDifference = n; // 최솟값을 저장할 변수

    // 1. wires를 하나씩 순회하며 끊어봄
    for (let i = 0; i < wires.length; i++) {
        const graph = Array.from({ length: n + 1 }, () => []);
        
        // i번째 와이어만 제외하고 그래프 생성
        const currentWires = wires.filter((_, index) => index !== i);
        for (const [u, v] of currentWires) {
            graph[u].push(v);
            graph[v].push(u);
        }

        // 2. BFS/DFS로 연결된 노드 수 계산
        const count = getNodesCount(1, graph, n);
        const diff = Math.abs(count - (n - count));
        
        // 3. 차이의 최솟값 업데이트
        minDifference = Math.min(minDifference, diff);
    }
    
    return minDifference;
}

// 연결된 노드의 수를 세는 BFS 함수
function getNodesCount(startNode, graph, n) {
    const visited = new Array(n + 1).fill(false);
    const queue = [startNode];
    visited[startNode] = true;
    let count = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        count++;
        
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    return count;
}
