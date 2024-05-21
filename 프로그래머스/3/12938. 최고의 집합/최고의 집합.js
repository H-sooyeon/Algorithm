function solution(n, s) {
    let answer = [];
    
    if(n > s) return [-1];
    
    while(s % n !== 0) {
        let div = parseInt(s / n, 10);
        answer.push(div);
        
        n -= 1;
        s = s - div;
    }
    
    if(n === 1) answer.push(s);
    else {
        // console.log(s, n);
        for(let i = 0; i < n; i++) {
            answer.push(parseInt(s / n, 10));
        }
    }

    return answer;
}