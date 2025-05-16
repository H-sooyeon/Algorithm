function solution(a) {
    let answer = 0;
    const counts = new Map();
    const n = a.length;
    
    // 1. 각 값의 등장 횟수 세기
    for(let num of a) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
    
    // 2. 요소마다 스타 수열 시도
    for(let [value, freq] of counts.entries()) {
        // 이미 만든 answer보다 작으면 패스
        if(freq * 2 <= answer) continue;
        
        let pairCount = 0;
        for(let i = 0; i < n - 1; i++) {
            // 인접한 쌍 중 하나는 value, 다른 하나는 value가 아니어야 한다.
            if((a[i] === value && a[i+1] !== value) || (a[i] !== value) && a[i+1] === value) {
                pairCount += 1;
                i += 1; // 다음 인덱스 넘어가기
            }
        }
        
        answer = Math.max(answer, pairCount * 2);
    }
    
    
    return answer;
}