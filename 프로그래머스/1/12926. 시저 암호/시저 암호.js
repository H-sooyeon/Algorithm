function solution(s, n) {
    let answer = '';
    
    for(let i = 0; i < s.length; i++) {
        if(s[i] === ' ') {
            answer += ' ';
            continue;
        }
        let code = s[i].charCodeAt() + n;
        if(s[i] >= 'A' && s[i] <= 'Z') {
            if(code >= 65 + 26) code -= 26;
            answer += String.fromCharCode(code);
        }
        else {
            if(code >= 97 + 26) code -= 26;
            answer += String.fromCharCode(code);
        }
    }
    
    return answer;
}