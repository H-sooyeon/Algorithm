function solution(m, n, puddles) {
    const dp = Array.from({length: n}, () => new Array(m).fill(0));
    
    for(let puddle of puddles) {
        const [x, y] = puddle;
        dp[y-1][x-1] = -1;
    }
    
    dp[0][0] = 1;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(dp[i][j] === -1 || (i === 0 && j === 0)) continue;
            
            let value = 0;
            if(i-1 >= 0 && dp[i-1][j] !== -1) value += dp[i-1][j];
            if(j-1 >= 0 && dp[i][j-1] !== -1) value += dp[i][j-1];
            
            dp[i][j] = value % 1000000007;
        }
    }
        
    return dp[n-1][m-1];
}