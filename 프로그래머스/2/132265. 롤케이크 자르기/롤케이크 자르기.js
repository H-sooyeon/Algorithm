function solution(topping) {
    let answer = 0;
    // 형한테 토핑 모두 주기
    let aToppingCnt = {}; // 형 토핑 종류 개수
    let bToppingCnt = {}; // 동생 토핑 종류 개수
    let aTopping = 0; // 형 토핑 종류
    let bTopping = 0; // 동생 토핑 종류
    
    // 형한테 토핑 다 주기
    for(let i = 0; i < topping.length; i++) {
        if(aToppingCnt[topping[i]]) {
            aToppingCnt[topping[i]]++;
        } else {
            aTopping++;
            aToppingCnt[topping[i]] = 1;
        }
    }
    
    // 동생한테 토핑 하나씩 주기
    for(let i = topping.length - 1; i >= 0; i--) {
        // 형 토핑 줄이기
        if(aToppingCnt[topping[i]] === 1) {
            aToppingCnt[topping[i]]--;
            aTopping--;
        } else {
            aToppingCnt[topping[i]]--;
        }
        
        // 동생 토핑 올리기
        if(bToppingCnt[topping[i]]) {
            bToppingCnt[topping[i]]++;
        } else {
            bTopping++;
            bToppingCnt[topping[i]] = 1;
        }
        if(bTopping === aTopping) answer++;
    }
    
    return answer;
}