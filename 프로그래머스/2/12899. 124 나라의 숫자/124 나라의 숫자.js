function solution(n) {
    let answer = '';
    const list = [4, 1, 2];
    
    while(n > 0) {
        answer = (n % 3) + answer;
        n = Math.floor((n - 1) / 3);
    }
    
    const result = [];
    for(let i = 0; i < answer.length; i++) {
        if(answer[i] === '0') result.push('4');
        else if(answer[i] === '1') result.push('1');
        else if(answer[i] === '2') result.push('2');
    }
    
    return result.join('');
}