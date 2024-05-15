function solution(order) {
    let answer = 0;
    let stack = [];
    
    for(let i = 1; i <= order.length; i++) {
        stack.push(i);
        
        let length = stack.length;
        while(length && stack[length - 1] === order[answer]) {
            stack.pop();
            answer++;
            length = stack.length;
        }
    }
    
    return answer;
}