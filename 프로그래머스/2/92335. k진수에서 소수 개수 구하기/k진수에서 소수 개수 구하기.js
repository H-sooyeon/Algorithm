function solution(n, k) {
    let answer = 0;
    
    let transition = n.toString(k).split('0');
    
    for(let i = 0; i < transition.length; i++) {
        if(transition[i] === '1') continue;
        if(transition[i] === '') continue;
        let flag = false;
        
        for(let j = 2; j <= Math.sqrt(transition[i]); j++) {
            if(transition[i] % j === 0) {
                flag = true;
                break;
            }
        }
        
        if(flag) continue;
        answer++;
    }
    
    return answer;
}