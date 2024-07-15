function solution(scores) {
    let answer = 1;
    let wanho = scores[0];
    let wanho_sum = scores[0][0] + scores[0][1];
    let maxScore = 0;
    
    scores.sort((a, b) => {
        if(a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0];
    })
        
    for(const score of scores) {
        if(maxScore <= score[1]) {
            maxScore = score[1];
            if(score[0] + score[1] > wanho_sum) {
                answer++;
            }
        }
        else {
            if(score[0] >= wanho[0] && score[1] >= wanho[1]) {
                return -1;
            }
        }
    }
            
    return answer;
}