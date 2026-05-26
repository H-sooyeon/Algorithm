// A 도둑은 자신이 남긴 흔적의 누적 개수가 n개 이상이면 붙잡힌다.
// B 도둑은 자신이 남긴 흔적의 누적 개수가 m개 이상이면 붙잡힌다.
function solution(info, n, m) {
    let answer = Infinity;
    const dp = Array.from({length: 40}, () => new Array(121).fill(Infinity));
    
    // B가 훔쳤을 때
    dp[0][info[0][1]] = 0;
    // A가 훔쳤을 때
    dp[0][0] = info[0][0];
    
    for(let i = 1; i < info.length; i++) {
        const valueB = info[i][1];
        const valueA = info[i][0];
        
        for(let prevB = 0; prevB < m; prevB++) {
            if(dp[i-1][prevB] === Infinity) continue;
            
            let newB = prevB + valueB;
            if(newB < m) {
                // 현재 물건을 B가 가져간다고 했을 때
                dp[i][newB] = Math.min(dp[i][newB], dp[i-1][prevB]);
            }
            // 현재 물건을 B가 가져가지 않는다고 했을 때
            dp[i][prevB] = Math.min(dp[i][prevB], dp[i-1][prevB] + valueA);
        }

    }
    
    for(let i = 0; i < m; i++) {
        answer = Math.min(answer, dp[info.length-1][i]);
    }
    
    return answer < n ? answer : -1;
    // 두 도둑 모두 경찰에 붙잡히지 않도록 모든 물건을 훔쳤을 때,
    // A 도둑이 남긴 흔적의 누적 개수의 최솟값을 return
    // 두 도둑 모두 붙잡히지 않게 할 수 없다면 -1 return
}