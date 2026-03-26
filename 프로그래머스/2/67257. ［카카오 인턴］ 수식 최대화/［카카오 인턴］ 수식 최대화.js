function solution(expression) {
    let answer = 0;
    
    const allElements = expression.split(/([\-*+])/);
    const operators = Array.from(new Set(expression.match(/[+\-*]/g)));
    const visited = new Array(operators.size).fill(false);
    const priority = [];
        
    const permutation = (list, visited) => {
        if(list.length === operators.length) {
            priority.push([...list]);
            return;
        }
        
        for(let i = 0; i < operators.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            list.push(operators[i]);
            permutation(list, visited);
            visited[i] = false;
            list.pop();
        }
    }
    
    const calNumbers = (num1, num2, oper) => {
        if(oper === '*') return num1 * num2;
        if(oper === '-') return num1 - num2;
        if(oper === '+') return num1 + num2;
    }
    
    // stack으로 연산자 계산
    const calExpression = (expression, priority) => {
        let fullStack = [...expression];
        for(let i = 0; i < priority.length; i++) {
            const stack = [];
            for(let j = 0; j < fullStack.length; j++) {
                if(fullStack[j] === '-' || fullStack[j] === '+' || fullStack[j] === '*') {
                    stack.push(fullStack[j]);
                    continue;
                }
            
                stack.push(Number(fullStack[j]));
                
                if(stack.length) {
                    while(stack.length >= 3) {
                        const operand2 = stack[stack.length - 1];
                        const oper = stack[stack.length - 2];
                        const operand1 = stack[stack.length - 3];
                                            
                        if(oper === priority[i]) {
                            const val = calNumbers(operand1, operand2, oper);
                            stack.pop();
                            stack.pop();
                            stack.pop();
                            
                            stack.push(val);
                        }
                        else break;
                    }
                }
            }
            fullStack = stack;
        }
        
        return Math.abs(fullStack[0]);
    }
    
    permutation([], visited);
    for(let opers of priority) {
        answer = Math.max(calExpression(allElements, opers), answer);
    }
    
    
    return answer;
}