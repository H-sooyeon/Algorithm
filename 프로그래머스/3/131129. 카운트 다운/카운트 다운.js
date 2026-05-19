// 정확히 0점으로 만들어야 하는 게임
// 싱글: 해당 수만큼 점수+
// 더블: 해당 수 * 2
// 트리플: 해당 수 * 3
// 불, 아우터 불: 50
function solution(target) {
    let answer = [];
    const dp = Array.from({length: target + 1}, () => new Array(2).fill(Infinity));
    dp[0] = [0, 0];
    
    for(let i = 1; i <= target; i++) {
        // 싱글
        for(let j = 1; j <= 20; j++) {
            if(i < j) break;
            
            if(dp[i-j][0] + 1 < dp[i][0] || 
               dp[i-j][0] + 1 === dp[i][0] && dp[i-j][1] + 1 > dp[i][1]) {
                dp[i] = [dp[i-j][0] + 1, dp[i-j][1] + 1];
            }
        }
        // 더블
        for(let j = 1; j <= 20; j++) {
            if(j * 2 > i) break;
            
            const double = j * 2;
            if(dp[i-double][0] + 1 < dp[i][0]) {
                dp[i] = [dp[i-double][0] + 1, dp[i-double][1]];
            }
        }
        // 트리플
        for(let j = 1; j <= 20; j++) {
            if(j * 3 > i) break;
            
            const triple = j * 3;
            if(dp[i-triple][0] + 1 < dp[i][0]) {
                dp[i] = [dp[i-triple][0] + 1, dp[i-triple][1]];
            }
        }
        // 불
        if(i >= 50) {
            if(dp[i-50][0] + 1 < dp[i][0] || 
               dp[i-50][0] + 1 === dp[i][0] && dp[i-50][1] + 1 > dp[i][1]) {
                dp[i] = [dp[i-50][0] + 1, dp[i-50][1] + 1];
            }
        }
    }
    
    // console.log(dp);
    return dp[target];
    // [던진 다트 수, 싱글 + 불 맞춘 횟수]
}