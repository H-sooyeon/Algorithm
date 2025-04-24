function solution(numbers) {
    // 최소 이동 가중치 배열을 생성한다.
    // weights[a][b] a 번호에서 b 번호로 갈 때의 가중치
    const weights = [
        [1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
        [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
        [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
        [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
        [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
        [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
        [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
        [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
        [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
        [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
    ]
    // DP[n][left][right]
    const DP = Array.from({length: numbers.length + 1}, () => Array.from({length: 10}, () => new Array(10).fill(Infinity)));
    
    DP[0][4][6] = 0;
    
    for(let idx = 0; idx < numbers.length; idx++) {
        const num = numbers[idx];
        
        const prevDP = DP[idx];
        const nowDP = DP[idx + 1];
        
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                const prevValue = prevDP[i][j];
                if(i === j || prevValue === Infinity) continue;
                
                // i -> num으로 왼손을 옮긴다.
                if(nowDP[num][j] > prevValue + weights[i][num]) {
                    nowDP[num][j] = prevValue + weights[i][num];
                }
                
                // j -> num으로 오른손을 옮긴다.
                if(nowDP[i][num] > prevValue + weights[j][num]) {
                    nowDP[i][num] = prevValue + weights[j][num];
                }
            }
        }
    }
        
    return Math.min(...DP[numbers.length].flat().flat());
}