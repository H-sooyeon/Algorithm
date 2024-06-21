function solution(s) {
    let answer = 0;
    let dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
    
    // 한 문자 자체는 펠린드롬을 만족한다.
    for(let i = 0; i < s.length; i++) {
        dp[i][i] = true;
    }
    answer = 1;
    
    // 두 문자씩 묶어서 펠린드롬인지 확인
    for(let i = 0; i < s.length - 1; i++) {
        if(s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            answer = 2;
        }
    }
    
    // 3문자 이상씩 묶어서 펠린드롬인지 확인
    for(let i = 2; i < s.length; i++) { // i는 펠린드롬인지 확인하는 문자열의 길이
        for(let start = 0; start < s.length - i; start++) {
            let end = start + i;
            
            if(s[start] === s[end] && dp[start + 1][end - 1]) {
                dp[start][end] = true;
                answer = Math.max(answer, i + 1);
            } else {
            }
        }
    }

    return answer;
}