// N 사용횟수의 최솟값
// 나누기 연산에서 나머지는 무시한다.
function solution(N, number) {
    let answer = 0;
    const dp = Array.from({length: 10}, () => new Set());
    dp[1].add(N); // N을 하나만 썼을 때
    
    // N을 하나만 썼는데 number라면 return 1
    if(dp[1] === number) {
        return 1;
    }
    
    // i는 N을 몇 번 썼는가
    for(let i = 2; i < 9; i++) {
        const value = Number(N.toString().repeat(i));
        dp[i].add(value);
        
        for(let j = 1; j < i; j++) {
            for(let num1 of dp[j]) {
                for(let num2 of dp[i-j]) {
                    dp[i].add(num1 + num2);
                    dp[i].add(Math.abs(num1 - num2));
                    dp[i].add(Math.floor(num2 / num1));
                    dp[i].add(num1 * num2);
                }
            }
        }
    }
    
    for(let i = 1; i < 9; i++) {
        if(dp[i].has(number)) {
            return i;
        }
    }
    
    // 최솟값이 8보다 크면 -1을 return
    return -1;
}