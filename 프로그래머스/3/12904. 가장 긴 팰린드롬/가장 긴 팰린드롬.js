function solution(s) {
    let answer = 1;
    const len = s.length;
    const dp = Array.from({length: len}, () => Array(len).fill(false));
    
    for(let i = 0; i < len; i++) {
        dp[i][i] = true;
    }
    
    for(let i = 0; i < s.length - 1; i++) {
        if(s[i] === s[i+1]) {
            dp[i][i+1] = true;
            answer = 2;
        }
    }
    
    for(let i = 2; i < len; i++) {
        for(let start = 0; start < len - i; start++) {
            const end = start + i;
            
            if(s[start] === s[end] && dp[start+1][end-1]) {
                dp[start][end] = true;
                answer = Math.max(answer, i + 1);
            }
        }
    }
    

    return answer;
}