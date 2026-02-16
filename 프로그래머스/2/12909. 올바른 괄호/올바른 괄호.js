function solution(s){
    let answer = true;

    let result = 0;
    for(let v of s) {
        result += v === '(' ? 1 : -1;
        
        if(result < 0) return false;
    }
    
    if(result !== 0) return false;

    return answer;
}