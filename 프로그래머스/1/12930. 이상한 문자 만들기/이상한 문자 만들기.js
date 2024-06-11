function solution(s) {
    let answer = '';
    
    let idx = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === ' ') {
            answer += ' ';
            idx = 0;
            continue;
        }

        if(idx % 2 === 0) {
            if(s[i] >= 'a' && s[i] <= 'z') {
                answer += String.fromCharCode(s[i].charCodeAt() - 32);
            } else answer += s[i];
        }
        else {
            if(s[i] >= 'A' && s[i] <= 'Z') {
                answer += String.fromCharCode(s[i].charCodeAt() + 32);
            } else answer += s[i];
        }
        
        idx++;
    }
    
    return answer;
}