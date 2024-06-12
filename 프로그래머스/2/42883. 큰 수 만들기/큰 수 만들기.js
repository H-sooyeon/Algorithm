function solution(number, k) {
    let stack = [];
    
    stack.push(number[0]);
    for(let i = 1; i < number.length; i++) {
        while(stack[stack.length - 1] < number[i] && k > 0) {
            if(stack.length) stack.pop();
            k--;
        }
        
        stack.push(number[i]);
    }
    
    if(k > 0) {
        stack = stack.slice(0, stack.length - k);
    }
        
    return stack.join('');
}