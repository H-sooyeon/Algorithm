function solution(n, wires) {
    let answer = n;
    
    /*
    * wires를 연결 리스트화
    * 완전탐색으로 전선을 하나씩 끊어서 dfs 탐색
    */
    
    const dfs = (visited, adj, node) => {
        visited[node] = true;
        let cnt = 1;
        
        for(let next of adj[node]) {
            if(visited[next]) continue;
            
            cnt += dfs(visited, adj, next);
        }
        
        return cnt;
    }
    
    for(let t = 0; t < wires.length; t++) {
        const adj = Array.from(Array(n + 1), () => new Array());
        const visited = new Array(n + 1).fill(false);
    
        for(let i = 0; i < wires.length; i++) {
            if(t === i) continue;
            
            const [v1, v2] = wires[i];
            adj[v1].push(v2);
            adj[v2].push(v1);
        }
        
        const results = [];
        const [v1, v2] = wires[t];
        
        results.push(dfs(visited, adj, v1));
        results.push(dfs(visited, adj, v2));
        
        if(results[0] + results[1] !== n) continue;
        
        answer = Math.min(answer, Math.abs(results[0] - results[1]));
    }
    
    
    return answer;
}