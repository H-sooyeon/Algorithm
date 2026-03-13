function solution(order) {
    let answer = 0;
    const stack = [];
    
    let target = 0;
    let item = 1;
    while(target < order.length) {
        stack.push(item);
        
        while(stack.length) {
            const lastItem = stack.pop();
            if(lastItem === order[target]) {
                answer += 1;
                target += 1;
            }
            else {
                stack.push(lastItem);
                break;
            };
        }
        
        if(item < order.length) item += 1;
        else break;
    }
    
    return answer;
}