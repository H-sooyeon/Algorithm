function solution(s){
    let answer = true;

    const arr = s.split('');
    const stack = [];
    
    for(let value of arr) {
        if(stack.length === 0) {
            stack.push(value);
            continue;
        }
        
        const lastValue = stack.pop();
        if(!(lastValue === '(' && value === ')')) {
            stack.push(lastValue, value);
        } 
    }
    
    if(stack.length > 0) answer = false;

    return answer;
}