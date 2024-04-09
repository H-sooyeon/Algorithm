function solution(n) {
    let dp = new Array(n + 1);

    dp[0] = 1;
    dp[1] = 0;
    dp[2] = 3;
    dp[3] = 0;
    
    if(n % 2 === 1) return 0;
    
    for(let i = 4; i <= n; i+=2) {
        dp[i] = (4 * dp[i - 2] - dp[i - 4]) % 1000000007;
        if (dp[i] <= 0)
            dp[i] += 1000000007;
    }

    return dp[n];
}