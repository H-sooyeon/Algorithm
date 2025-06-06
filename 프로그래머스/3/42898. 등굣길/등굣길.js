function solution(m, n, puddles) {
    const INF = 987654321;
    const MOD = 1000000007;
    let dp = Array.from({length: n}, () => Array(m));
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            dp[i][j] = [0, INF];
        }
    }
    
    const dy = [0, 1];
    const dx = [1, 0];
    
    dp[0][0] = [0, 0];
    
    puddles.forEach(([x, y]) => {
        dp[y - 1][x - 1] = -1;
    })
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(dp[i][j] === -1) continue;
            for(let k = 0; k < 2; k++) {
                let ny = i + dy[k];
                let nx = j + dx[k];
                                
                if(ny >= n || nx >= m) continue;
                if(dp[ny][nx] === -1) continue;
                
                if(dp[ny][nx][1] > dp[i][j][1] + 1) {
                    dp[ny][nx][1] = dp[i][j][1] + 1;
                    dp[ny][nx][0] = (dp[i][j][0] ? dp[i][j][0] : 1) % MOD;
                }
                else if(dp[ny][nx][1] === dp[i][j][1] + 1) {
                    dp[ny][nx][0] = (dp[ny][nx][0] + dp[i][j][0]) % MOD;
                }
            }
        }
    }
    
    // console.log(dp);
    
    return dp[n-1][m-1][0] % MOD;
}