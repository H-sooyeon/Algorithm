function solution(n) {
    let answer = '';
    
    // while(n > 0) {
    //     answer += parseInt(n % 3);
    //     n = parseInt(n / 3);
    // }
    
    answer = n.toString(3);
    answer = answer.split('').reverse().join('');
    answer = parseInt(answer, 3);
    
    return answer;
}