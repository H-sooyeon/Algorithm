function solution(n, s, a, b, fares) {
    const INF = Number.MAX_SAFE_INTEGER;
    let answer = INF;
    
    const dp = Array.from({length: n + 1}, () => new Array(n + 1).fill(INF));
    
    for(let fare of fares) {
        const [v1, v2, cost] = fare;
        dp[v1][v2] = cost;
        dp[v2][v1] = cost;
    }
    
    // 자기 자신으로 가는 최단 경로는 0
    for(let i = 1; i <= n; i++) {
        dp[i][i] = 0;
    }
    
    // 플로이드 워셜
    for(let k = 1; k <= n; k++) {
        for(let a = 1; a <= n; a++) {
            for(let b = 1; b <= n; b++) {
                dp[a][b] = Math.min(dp[a][b], dp[a][k] + dp[k][b]);
            }
        }
    }
    
    for(let i = 1; i <= n; i++) {
        if(s === i) continue;
        answer = Math.min(answer, dp[s][a] + dp[s][b], dp[s][i] + dp[i][a] + dp[i][b]);
    }
            
    return answer;
}