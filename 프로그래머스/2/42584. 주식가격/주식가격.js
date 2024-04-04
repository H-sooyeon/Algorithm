function solution(prices) {
    let answer = [];
    
    for(let i = 0; i < prices.length; i++) {
        let value = 0;
        for(let j = i + 1; j < prices.length; j++) {
            if(prices[i] <= prices[j]) {
                value++;
                // console.log(prices[i], prices[j], value);
            } 
            else {
                value++;
                break;
            }
        }
        answer.push(value);
    }
    
    return answer;
}