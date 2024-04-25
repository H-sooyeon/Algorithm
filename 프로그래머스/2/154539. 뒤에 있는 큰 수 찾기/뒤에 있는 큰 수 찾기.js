function solution(numbers) {
    let answer = [];
    let stack = [];
    
    stack.push([numbers[0], 0]);
    for(let i = 1; i < numbers.length; i++) {
        let [top, idx] = stack[stack.length - 1];
        
        // 뒷 큰수 존재 시 저장
        while(top < numbers[i] && stack.length) {
            answer.push([idx, numbers[i]]);
            stack.pop();
            
            if(stack.length) {
                [top, idx] = stack[stack.length - 1];   
            }
        }
        
        stack.push([numbers[i], i]);
    }
    
    let size = stack.length;
    for(let i = 0; i < size; i++) {
        let [top, idx] = stack.pop();
        answer.push([idx, -1]);
    }

    answer.sort((a, b) => a[0] - b[0]);
    answer = answer.map(([idx, v]) => v);
    
    return answer;
}