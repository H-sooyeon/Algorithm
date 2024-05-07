function solution(k, d) {
    let answer = 0;
    
    for(let x = 0; x <= d; x+=k) {
        let y = parseInt(Math.sqrt(d ** 2 - x ** 2)); // y 최댓값 확보
        answer += parseInt(y / k) + 1;
        // console.log(x, parseInt(y / k));
    }
    
    return answer;
}