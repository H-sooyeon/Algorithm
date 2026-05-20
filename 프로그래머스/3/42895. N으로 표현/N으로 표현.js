// N을 8개까지 사용하는 경우를 모두 구한다.
function solution(N, number) {
    if(N === number) return 1;
    
    let answer = 0;
    // idx: N을 몇 개 썼는지, value: 계산 결과
    const dp = Array.from({length: 9}, () => new Set());
    
    for(let count = 1; count < 9; count++) {
        dp[count].add(Number(String(N).repeat(count)));
    }
    
    for(let i = 1; i < 9; i++) {
        for(let j = 1; j < i; j++) {
            for(const arg1 of dp[j]) {
                for(const arg2 of dp[i-j]) {
                    // 사칙 연산
                    dp[i].add(arg1 + arg2);
                    dp[i].add(arg1 * arg2);
                    dp[i].add(arg1 - arg2);
                    if(arg2 !== 0) dp[i].add(Math.floor(arg1 / arg2));
                }
            }
        }
    }
    
    for(let i = 1; i < 9; i++) {
        if(dp[i].has(number)) return i;
    }
    
    return -1;
    // N 사용횟수의 최솟값
    // 8보다 크면 -1 리턴
}