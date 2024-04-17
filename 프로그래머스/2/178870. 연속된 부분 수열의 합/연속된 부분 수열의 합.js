function solution(sequence, k) {
    let answer = [];
    let prefix = [];
    let frontPoint = sequence.length - 2;
    let backPoint = sequence.length - 1;
    
    let result = sequence.reduce((acc, cur) => {
        prefix.push(acc);
        return acc + cur;
    }, 0);
    
    prefix.shift();
    
    prefix.push(result);
    while(frontPoint > -1) {
        if(prefix[backPoint] === k) {
            answer.push([0, backPoint]);
            frontPoint--;
            backPoint--;
            continue;
        };
        
        if(prefix[backPoint] - prefix[frontPoint] === k) {
            answer.push([frontPoint+1, backPoint]);
            backPoint--;
            continue;
        }
        
        if(prefix[backPoint] - prefix[frontPoint] > k) {
            backPoint--;
            continue;
        }
        else {
            frontPoint--;
            continue;
        }
    }
    
    let idx = answer.length - 1;
    for(let i = answer.length - 2; i >= 0; i--) {
        let v1 = answer[idx][1] - answer[idx][0];
        let v2 = answer[i][1] - answer[i][0];
        
        if(v1 > v2) idx = i;
    }
        
    return answer[idx];
}