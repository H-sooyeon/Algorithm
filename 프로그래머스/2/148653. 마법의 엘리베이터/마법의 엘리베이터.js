function solution(storey) {
    let answer = 0;
    
    while(storey > 0) {
        let current = storey % 10; // 일의 자리
        let next = Math.floor(storey / 10) % 10; // 십의 자리
        
        // 현재 자리가 6 이상이라면 올림
        if(current > 5) {
            answer += 10 - current;
            storey += 10;
        }
        else if(current < 5) {
            // 현재 자리가 4 이하라면 내림
            answer += current;
        }
        else {
            // 현재 자리가 5라면, 다음 자리 수를 보고 결정
            // 다음 자리가 5 이상이라면 올리기
            // 다음 자리가 4 이하라면 내리기
            if(next >= 5) {
                answer += 5;
                storey += 10;
            } else {
                answer += 5;
            }
        }
        storey = Math.floor(storey / 10);
    }
    
    return answer;
}