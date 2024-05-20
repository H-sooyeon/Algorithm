function solution(n, info) {
    let answer = [];
    let answer_cnt = 0;
    let answer_score = 0;
    let answer_aScore = 0;
    
    const dfs = (b, start, k) => {
        if(b.length === k) {
            let tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            b.forEach((v) => (tmp[v] = info[v] + 1));
            
            let cnt = 0;
            let score = 0;
            let aScore = 0;
            
            for(let i = 0; i < info.length; i++) {
                cnt += tmp[i];
                if(info[i] < tmp[i]) {
                    score += (10 - i);
                }
                else if(info[i] >= tmp[i] && info[i] !== 0) {
                    aScore += (10 - i);
                }
                if(cnt > n) return;
            }
            
            if(aScore < score) {
                // console.log(tmp);
                // console.log(aScore, score);
                let a = Math.abs(aScore - score);
                let b = Math.abs(answer_aScore - answer_score);
                if(a > b) {
                    // console.log(tmp);
                    // console.log(aScore, score, answer_aScore, answer_score);
                    answer_cnt = cnt;
                    answer_aScore = aScore;
                    answer_score = score;
                    answer = tmp;
                }
                else if (a === b) {
                    // 가장 큰 점수 차이가 여러가지일 경우 가장 낮은 점수를
                    // 더 많이 맞힌 경우로
                    let sortArr = [tmp, answer];
                    sortArr.sort((a, b) => {
                        for(let i = 10; i >= 0; i--) {
                            if(a[i] !== b[i]) {
                                return b[i] - a[i];
                            }
                        }
                        return 0;
                    })
                    
                    if(sortArr[0] === tmp) {
                        answer = tmp;
                        answer_score = score;
                        answer_aScore = aScore;
                        answer_cnt = cnt;
                    }
                    // console.log(sortArr[0]);
                    // console.log(tmp);
                    // console.log(answer);
                    // console.log(aScore, score, answer_aScore, answer_score);
                    // if(answer_score > score) {
                    //     answer = tmp;
                    //     answer_score = score;
                    //     answer_aScore = aScore;
                    //     answer_cnt = cnt;
                    // }
                }
            }
            return;
        }
        
        for(let i = start + 1; i < info.length; i++) {
            b.push(i);
            dfs(b, i, k);
            b.pop();
        }
    }
    
    for(let i = 1; i < info.length; i++) {
        dfs([], -1, i);
    }
    
    if(!answer.length) return [-1];
    
    if(answer_cnt < n) answer[10] = n - answer_cnt;
    return answer;
}