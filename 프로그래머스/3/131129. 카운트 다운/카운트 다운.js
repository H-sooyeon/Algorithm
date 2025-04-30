function solution(target) {
    const INF = 987654321;
    let dp = Array.from({length: target + 1}, () => [0, 0]);
    
    if(target <= 20) return [1, 1];
            
    for(let num = 1; num <= target; num += 1) {
        let answer = [INF, INF];
        // 싱글
        for(let i = 1; i <= 20; i++) {
            const prevIdx = num - i;
            if(prevIdx < 0) break;
            
            const value = [dp[prevIdx][0] + 1, dp[prevIdx][1] + 1];
            if((answer[0] === value[0] && answer[1] < value[1]) || answer[0] > value[0]) {
                answer = value;
            }
        }
        
        // 더블
        for(let i = 1; i <= 20; i++) {
            const prevIdx = num - i * 2;
            if(prevIdx < 0) break;
            
            const value = [dp[prevIdx][0] + 1, dp[prevIdx][1]];
            if((answer[0] === value[0] && answer[1] < value[1]) || answer[0] > value[0]) {
                answer = value;
            }
        }
        
        // 트리플
        for(let i = 1; i <= 20; i++) {
            const prevIdx = num - i * 3;
            if(prevIdx < 0) break;
            
            const value = [dp[prevIdx][0] + 1, dp[prevIdx][1]];
            if((answer[0] === value[0] && answer[1] < value[1]) || answer[0] > value[0]) {
                answer = value;
            }
        }
        
        if(num >= 50) {
            const value = [dp[num - 50][0] + 1, dp[num - 50][1] + 1];
            if((answer[0] === value[0] && answer[1] < value[1]) || answer[0] > value[0]) {
                answer = value;
            }
        }
        
        dp[num] = answer;
    }
    
    // console.log(dp[target]);
    
    
    return dp[target];
}