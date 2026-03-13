function solution(m, n, puddles) {
    const dp = Array.from({length: n}, () => new Array(m).fill(0));
    
    for(let puddle of puddles) {
        const [x, y] = puddle;
        dp[y-1][x-1] = -1;
    }
    
    let rowFlag = false;
    for(let i = 0; i < m; i++) {
        if(rowFlag) dp[0][i] = -1;
        
        if(dp[0][i] !== -1) dp[0][i] = 1;
        else rowFlag = true
    }
    
    let colFlag = false;
    for(let i = 0; i < n; i++) {
        if(colFlag) dp[i][0] = -1;
        
        if(dp[i][0] !== -1) dp[i][0] = 1;
        else colFlag = true;
    }
    
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            if(dp[i][j] === -1) continue;
            
            let value = 0;
            if(dp[i-1][j] !== -1) value += dp[i-1][j];
            if(dp[i][j-1] !== -1) value += dp[i][j-1];
            
            dp[i][j] = value % 1000000007;
        }
    }
        
    return dp[n-1][m-1];
}