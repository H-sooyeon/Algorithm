function solution(n, wires) {
    if (n === 2) return 0;

    // 1. 인접 리스트 및 각 노드의 간선 수(degree) 초기화
    const adj = Array.from({ length: n }, () => new Set());
    const degree = new Array(n).fill(0);
    const w = new Array(n).fill(1); // 자신을 포함한 서브트리 노드 수

    for (const [u, v] of wires) {
        adj[u - 1].add(v - 1);
        adj[v - 1].add(u - 1);
        degree[u - 1]++;
        degree[v - 1]++;
    }

    // 2. 초기 리프 노드(간선이 1개인 노드) 찾기
    let leaves = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) {
            leaves.push(i);
        }
    }

    let processedCount = 0;
    // 최종적으로 1~2개의 중심 노드가 남을 때까지 반복
    while (processedCount < n - 2) {
        const nextLeaves = [];
        processedCount += leaves.length;

        for (const i of leaves) {
            // 현재 리프 노드 i와 연결된 부모 노드 j 찾기
            if (adj[i].size === 0) continue;
            
            const j = adj[i].values().next().value; // 연결된 유일한 노드

            // 부모 노드에 자신의 서브트리 노드 수 전달
            w[j] += w[i];

            // 관계 끊기
            adj[j].delete(i);
            adj[i].delete(j);
            degree[j]--;

            // 부모 노드가 새로 리프 노드가 되었다면 다음 단계에 추가
            if (degree[j] === 1) {
                nextLeaves.push(j);
            }
        }
        leaves = nextLeaves;
    }

    // 3. 계산된 w 배열을 바탕으로 최솟값 찾기
    let answer = n;
    for (const v of w) {
        const diff = Math.abs(v - (n - v));
        if (diff < answer) {
            answer = diff;
        }
    }

    return answer;
}