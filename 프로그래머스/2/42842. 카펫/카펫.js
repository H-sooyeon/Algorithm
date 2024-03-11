function solution(brown, yellow) {
    let answer = [];
    
    // yellow의 약수 찾기
    const getDivisors = (num) => {
        const divisors = [];
        
        for(let i = 1; i <= Math.sqrt(num); i++) {
            if(num % i === 0) {
                divisors.push(i);
                if(num / i !== i) {
                    divisors.push(num / i);
                }
            }
        }
        
        return divisors;
    }
    
    let colLengths = getDivisors(yellow);
    
    for(let i = 0; i < colLengths.length; i++) {
        let rowLength = yellow / colLengths[i];
        
        // 가로 * 2 + 세로 * 2 + 대각선 4개
        let brownCnt = (rowLength * 2) + (colLengths[i] * 2) + 4;
        
        if(brownCnt === brown) {
            answer.push(rowLength + 2);
            answer.push(colLengths[i] + 2);
            break;
        }
    }
    
    return answer;
}