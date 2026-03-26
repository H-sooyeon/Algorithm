function solution(n, k) {
    let answer = [];
    const visited = new Array(n+1).fill(false);
    let currentK = k - 1;
    
    const getFactorial = (num) => {
        let res = 1;
        for(let i = 2; i <= num; i++) res *= i;
        return res;
    }
    
    for(let i = n; i > 0; i--) {
        let factorial = 1; // gap
        for(let j = 1; j < i; j++) factorial *= j;
        
        // 현재 자리에 올 숫자가 남은 숫자들 중 몇 번째인지 계산
        const whatNumberIdx = Math.floor(currentK / factorial);
        
        currentK %= factorial;
        
        let count = 0;
        for(let j = 1; j <= n; j++) {
            if(!visited[j]) {
                if(count === whatNumberIdx) {
                    answer.push(j);
                    visited[j] = true;
                    break;
                }
                count += 1;
            }
        }
    }
        
    return answer;
}