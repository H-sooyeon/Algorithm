// 시간
function solution(n, times) {
    let answer = 0;
    
    let left = 1;
    let right = Number.MAX_SAFE_INTEGER;
    
    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        
        let passedPerson = 0;
        for(let time of times) {
            passedPerson += Math.floor(mid / time);
        }
        
        if(passedPerson < n) {
            left = mid + 1;
        }
        else {
            answer = mid;
            right = mid;
        }
    }
    
    return answer;
}