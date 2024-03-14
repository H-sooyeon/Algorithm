function solution(s) {
    let answer = 0;
    
    const isRight = (str) => {
        const stack = [];
        
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '(' || str[i] === '{' || str[i] === '[') stack.push(str[i]);
            else if(!stack.length) {
                stack.push('false');
                break;
            }
            else {
                if(str[i] === ')' && stack[stack.length-1] === '(') stack.pop();
                if(str[i] === '}' && stack[stack.length-1] === '{') stack.pop();
                if(str[i] === ']' && stack[stack.length-1] === '[') stack.pop();
            }
        }
        
        if(stack.length) return false;
        return true;
    }
    let rotation = s;
    if(isRight(rotation)) answer++;
    
    for(let i = 0; i < s.length-1; i++) {
        rotation = rotation.slice(1);
        rotation += s[i];
        if(isRight(rotation)) answer++;
    }
    
    return answer;
}