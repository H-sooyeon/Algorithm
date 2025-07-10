function solution(n, info) {
    let answer = [];
    let diff = 0;
    
    const dfs = (wins, depth) => {
        if(depth === 10) {
            let arrow = 0;
            const lion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let lionScore = 0;
            let apeachScore = 0;
            
            wins.forEach((win) => {
                lion[win] = info[win] + 1;
                arrow += info[win] + 1;
            })
            
            if(arrow > n) return;
            lion[10] = n - arrow;
            
            lion.forEach((lionArrowCnt, idx) => {
                if(lionArrowCnt > info[idx]) lionScore += 10 - idx;
                else if(lionArrowCnt <= info[idx] && info[idx] !== 0) apeachScore += 10 - idx;
            })
            
            if(lionScore - apeachScore > diff) {
                diff = lionScore - apeachScore;
                answer = [...lion];
            }
            else if(lionScore - apeachScore === diff) {
                // 낮은 점수가 더 많은 걸로 교체
                for(let i = lion.length - 1; i >= 0; i--) {
                    if(lion[i] > answer[i]) {
                        answer = [...lion];
                        break;
                    }
                    else if(lion[i] < answer[i]) {
                        break;
                    }
                }
            }
            
            return;
        }
        
        // depth에 대해 lion이 이기는 경우, 지는 경우로 나눠 재귀호출
        wins.push(depth);
        dfs(wins, depth + 1);
    
        wins.pop();
        dfs(wins, depth + 1);
    }
    
    dfs([], 0);
    
    if(answer.length === 0) return [-1];
    
    return answer;
}