// stack
// top에서 나온 두 값이 일치하다면 제거
function solution(s) {
    let stack = [];
    
    for(let i = 0; i < s.length; i++) {
        if(stack[stack.length - 1] === s[i]) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }
    
    return !stack.length ? 1 : 0;
}