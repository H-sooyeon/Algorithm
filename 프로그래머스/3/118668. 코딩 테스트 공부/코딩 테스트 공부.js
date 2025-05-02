function solution(alp, cop, problems) {
    const INF = 987654321;
    const dp = Array.from({length: 151}, () => Array(151).fill(INF));
    
    // 문제들 중 가장 높은 알고력과 가장 높은 코딩력을 추출
    let requireMaxAlp = 0;
    let requireMaxCop = 0;
    
    problems.forEach((problem) => {
        const [alp_req, cop_req, alp_rwd, cop_rwd, cost] = problem;
        requireMaxAlp = Math.max(requireMaxAlp, alp_req);
        requireMaxCop = Math.max(requireMaxCop, cop_req);
    });
    
    // 초기의 알고력과 코딩력으로 문제를 모두 풀 수 있다면 early return
    if(alp >= requireMaxAlp && cop >= requireMaxCop) {
        return 0;
    }
    
    if(alp > requireMaxAlp) {
        alp = requireMaxAlp;
    }
    if(cop > requireMaxCop) {
        cop = requireMaxCop;
    }
    
    dp[alp][cop] = 0;
    
    for(let i = alp; i <= requireMaxAlp; i++) {
        for(let j = cop; j <= requireMaxCop; j++) {
            if(i === requireMaxAlp && j === requireMaxCop) continue;
            
            // 알고리즘 공부하기
            if(i < requireMaxAlp) {
                dp[i+1][j] = Math.min(dp[i][j] + 1, dp[i+1][j]);
                // console.log('알고리즘 공부하기', i, j, dp[i][j], '->', dp[i+1][j]);
            }
            
            // 코딩 공부하기
            if(j < requireMaxCop) {
                dp[i][j+1] = Math.min(dp[i][j] + 1, dp[i][j+1]);
                // console.log('코딩 공부하기', i, j, dp[i][j], '->', dp[i][j+1])
            }
            
            // 문제 풀기
            problems.forEach((problem) => {
                const [alp_req, cop_req, alp_rwd, cop_rwd, cost] = problem;
                if(i >= alp_req && j >= cop_req) {
                    let resultAlp = i + alp_rwd;
                    let resultCop = j + cop_rwd;
                    
                    if(resultAlp > requireMaxAlp) {
                        resultAlp = requireMaxAlp;
                    }
                    if(resultCop > requireMaxCop) {
                        resultCop = requireMaxCop;
                    }
                    dp[resultAlp][resultCop] = Math.min(dp[resultAlp][resultCop], dp[i][j] + cost);
                }
            })
        }
    }
        
    return dp[requireMaxAlp][requireMaxCop];
}