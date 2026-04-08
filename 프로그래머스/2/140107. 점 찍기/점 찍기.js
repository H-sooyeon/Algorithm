function solution(k, d) {
    let answer = 0;   
    
    for(let a = 0; a <= d; a += k) {
        const maxB = Math.sqrt(d ** 2 - a ** 2);
        
        // 0을 포함해야 하므로 +1
        answer += Math.floor(maxB / k) + 1;
    }
    
    return answer;
}