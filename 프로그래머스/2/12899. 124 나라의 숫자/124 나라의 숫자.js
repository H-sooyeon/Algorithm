// 10진법
// 1, 2, 3, 4, 5, 6
// 124 진법
// 1, 2, 4, 11, 12, 14
// 1, 2, 14, 11, 12, 24
function solution(n) {
    let answer = '';
    const list = [4, 1, 2];
    
    while(n > 0) {
        answer = list[n % 3] + answer;
        if(n % 3 === 0) {
            n = Math.floor((n - 1) / 3);
        }
        else {
            n = Math.floor(n / 3);
        }   
    }
    
    return answer;
}