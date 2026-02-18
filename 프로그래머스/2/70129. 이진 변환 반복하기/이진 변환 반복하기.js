function solution(s) {
    let answer = [0, 0];
    
    let cur = s;
    let prev = cur;
    while(cur !== '1') {
        cur = cur.replaceAll('0', '');
        answer[1] += prev.length - cur.length;
        
        cur = cur.length.toString(2);
        
        prev = cur;
        answer[0] += 1;
    }
    
    return answer;
}