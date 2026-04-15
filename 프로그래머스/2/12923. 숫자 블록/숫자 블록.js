function solution(begin, end) {
    let answer = [];
    
    const findMeasure = (value) => {
        let maxValue = 1;
        for(let i = 2; i <= Math.sqrt(value); i++) {
            if(value % i === 0) {
                const partner = value / i;
                
                if(partner <= 10000000) {
                    maxValue = partner;
                    break;
                }
                
                maxValue = i;
            }
        }
        return maxValue;
    }
    
    for(let i = begin; i <= end; i++) {
        if(i === 1) {
            answer.push(0);
            continue;
        }
        
        answer.push(findMeasure(i));
    }
    
    return answer;
}