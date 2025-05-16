function solution(n, s, a, b, fares) {
    const INF = Number.MAX_SAFE_INTEGER;
    const graph = Array.from({length: n + 1}, () => Array(n + 1).fill(INF));
    let answer = INF;
    
    fares.forEach((fare) => {
        const [c, d, f] = fare;
        graph[c][d] = f;
        graph[d][c] = f;
    })
    
    for(let i = 1; i <= n; i++) {
        graph[i][i] = 0;
    }

    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                if(i === j) continue;
                
                const cost = graph[i][k] + graph[k][j];
                graph[i][j] = Math.min(cost, graph[i][j]);
            }
        }
    }
    
    for(let i = 1; i <= n; i++) {
        const cost = graph[s][i] + graph[i][a] + graph[i][b];
        answer = Math.min(answer, cost);
       
    }
        
    return answer;
}