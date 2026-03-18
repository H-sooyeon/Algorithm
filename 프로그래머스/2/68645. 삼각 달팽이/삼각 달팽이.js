function solution(n) {
    let answer = [];
    const triangle = Array.from({length: n}, () => new Array(n).fill(null));
    const dp = new Array(n + 1);
    dp[0] = 0;
    
    for(let i = 1; i < n + 1; i++) {
        dp[i] = dp[i-1] + i;
    }
    
    // n 4
    // 1
    // 2 9
    // 3 10 8
    // 4 5  6 7
    
    // n 5
    // 1
    // 2 12
    // 3 13 11
    // 4 14 15 10
    // 5 6  7  8  9
    
    let number = 1;
    let cnt = 0;
    while(number <= dp[n]) {
        // 아래로 내려가기
        for(let i = cnt * 2; i < n - cnt; i++) {
            triangle[i][cnt] = number;
            number += 1;
        }
        
        if(number === dp[n] + 1) break;
                
        // 오른쪽으로
        for(let j = cnt + 1; j < n - (cnt * 2); j++) {
            triangle[n - cnt - 1][j] = number;
            number += 1;
        }
                
        if(number === dp[n] + 1) break;
                
        // 위로 올라가기
        for(let i = n - cnt - 2; i > cnt * 2; i--) {
            triangle[i][i - cnt] = number;
            number += 1;
        }
        cnt += 1;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= i; j++) {
            answer.push(triangle[i][j]);
        }
    }
    return answer;
}