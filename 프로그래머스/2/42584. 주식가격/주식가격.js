function solution(prices) {
    let answer = [];
    
    for(let i = 0; i < prices.length; i++) {
        let value = 0;
        for(let j = i + 1; j < prices.length; j++) {
            value++;
            if(prices[i] > prices[j]) break;
        }
        answer.push(value);
    }
    
    return answer;
}