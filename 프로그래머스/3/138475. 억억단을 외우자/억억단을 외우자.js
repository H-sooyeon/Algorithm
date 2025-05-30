// e 이하의 임의의 수 s 여러개
// s보다 크거나 같고 e보다 작거나 같은 수 중에서 가장 많이 등장한 수
function solution(e, starts) {
    let answer = [];
    const factors = new Array(e + 1).fill(0);
    const maxFreqFactor = new Array(e + 1).fill(0);
    
    const findFactorsCnt = () => {
        for(let i = 1; i <= e; i++) {
            for(let j = i; j <= e; j += i) {
                factors[j] += 1;
            }
        }
    }
    
    // 1부터 e까지의 값의 약수의 개수 저장
    findFactorsCnt();
    
    maxFreqFactor[e] = e;
    let cnt = factors[e];
    for(let i = e - 1; i >= 0; i--) {
        if(cnt <= factors[i]) {
            cnt = factors[i];
            maxFreqFactor[i] = i;
        }
        else {
            maxFreqFactor[i] = maxFreqFactor[i+1];
        }
    }
    
    starts.forEach((start) => {
        answer.push(maxFreqFactor[start]);
    })
    
    return answer;
}