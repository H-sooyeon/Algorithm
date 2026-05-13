// 파이프를 열었다 닫는 행동을 최대 k번 반복해 최대한 많은 배양체에 바이러스를 감염시킨다.
// n: 배양체의 개수
// infection: 감염된 배양체의 노드 번호
// edges: 파이프의 정보 2차원 정수 배열 [x, y, type]
// k: 최대 행동 수
function solution(n, infection, edges, k) {
    let answer = 0;
    const adj = Array.from({length: n + 1}, () => new Array());
    const infectedNodes = new Set([infection]);
    
    // 인접 배열 정리
    edges.forEach(([x, y, type]) => {
        adj[x].push([type, y]);
        adj[y].push([type, x]);
    })
    
    const dfs = (node, type, list, visited) => {
        visited[node] = true;
        let result = [node];
        
        for(let [nextType, next] of adj[node]) {
            if(nextType !== type || visited[next]) continue;
            
            result = [...result, ...dfs(next, type, list, visited)];
        }
        
        return result;
    }
    
    const spread = (type, depth, infected) => {
        if(depth === k + 1) {
            answer = Math.max(answer, infected.size);
            return;
        }
        
        if(type === 1) { // B, C 파이프 열기
            const resultB = new Set([...infected]);
            const resultC = new Set([...infected]);
            const visited = new Array(n + 1).fill(false);
            
            for(let node of infected) {
                const nodesB = dfs(node, 2, [], visited);
                nodesB.forEach(n => resultB.add(n));
                
                const nodesC = dfs(node, 3, [], visited);
                nodesC.forEach(n => resultC.add(n));
            }
            
            spread(2, depth + 1, resultB);
            spread(3, depth + 1, resultC);
        }
        else if(type === 2) { // A, C 파이프 열기
            const resultA = new Set([...infected]);
            const resultC = new Set([...infected]);
            const visited = new Array(n + 1).fill(false);
            
            for(let node of infected) {
                const nodesA = dfs(node, 1, [], visited);
                nodesA.forEach(n => resultA.add(n));
                
                const nodesC = dfs(node, 3, [], visited);
                nodesC.forEach(n => resultC.add(n));
            }
            
            spread(1, depth + 1, resultA);
            spread(3, depth + 1, resultC);
        }
        else { // A, B 파이프 열기
            const resultA = new Set([...infected]);
            const resultB = new Set([...infected]);
            const visited = new Array(n + 1).fill(false);
            
            for(let node of infected) {
                const nodesA = dfs(node, 1, [], visited);
                nodesA.forEach(n => resultA.add(n));
                
                const nodesB = dfs(node, 2, [], visited);
                nodesB.forEach(n => resultB.add(n));
            }
            
            spread(1, depth + 1, resultA);
            spread(2, depth + 1, resultB);
        }
    }
    
    spread(1, 1, infectedNodes);
    spread(2, 1, infectedNodes);
    spread(3, 1, infectedNodes);
        
    return answer;
}