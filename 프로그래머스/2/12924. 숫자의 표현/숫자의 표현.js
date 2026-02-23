function solution(n) {
    let answer = 0;
    
    /*
    * (m) + (m + 1) + (m + 2) + (m + 3)... + (m + x) = n
    * -> m * (x + 1) + (1 + 2 + 3 + ... x) = n
    * (n - (1 + 2 + 3 + ... + x)) / (x + 1) = m
    */
    
    const prefix = new Array(parseInt(n / 2) + 1).fill(0);
    for(let i = 1; i < prefix.length; i++) {
        prefix[i] = prefix[i-1] + i;
    }
    
    // i가 x
    for(let i = 0; i < n / 2; i++) {
        if(n - prefix[i] <= 0) continue;
        
        if((n - prefix[i]) % (i + 1) === 0) {
            answer += 1;
        }
    }
    
    return answer;
}