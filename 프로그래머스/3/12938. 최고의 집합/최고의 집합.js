function solution(n, s) {
    let answer = [];
    
    if(s === 1) {
        return [-1];
    }
    
    let cnt = n;
    let num = s;
    while(cnt > 0) {
        let quotient = Math.floor(num / cnt);
        let remain = num - quotient;
                
        if(quotient === 0) {
            answer.push(remain);
            break;
        }
        
        answer.push(quotient);
        if(remain === 0) break;
        
        num = remain;
        cnt -= 1;
    }
    
    if(answer.length !== n) return [-1];
    
    return answer;
}