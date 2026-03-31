function solution(n, money) {
    let answer = 0;
    const dp = new Array(n+1).fill(0);
    
    dp[0] = 1;
    
    for(let m of money) {
        for(let i = 1; i <= n; i++) {
            if(i-m < 0) continue;
            dp[i] = (dp[i] + dp[i-m]) % 1000000007;
        }
    }
    
    // console.log(dp);
        
    return dp[n];
}