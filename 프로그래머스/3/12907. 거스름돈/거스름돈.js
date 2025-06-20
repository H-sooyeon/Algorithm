function solution(n, money) {
    const dp = new Array(n + 1).fill(0);
    
    dp[0] = 1;
    for(let i = 0; i < money.length; i++) {
        for(let j = 1; j <= n; j++) {
            if(money[i] <= j) {
                dp[j] += dp[j - money[i]];
            }
        }
    }
        
    return dp[n];
}