function solution(triangle) {
    let answer = 0;
    let length = triangle.length;
    let dp = Array.from(Array(length), () => Array(triangle[length-1].length).fill(0));
    
    dp[0][0] = triangle[0][0];
    for(let i = 0; i < length - 1; i++) {
        for(let j = 0; j < triangle[i].length; j++) {
            // 대각선 방향 dp
            dp[i+1][j] = Math.max(dp[i+1][j], dp[i][j] + triangle[i+1][j])
            dp[i+1][j+1] = Math.max(dp[i+1][j+1], dp[i][j] + triangle[i+1][j+1]);
        }
    }
    
    answer = Math.max(...dp[dp.length-1])    
    return answer;
}