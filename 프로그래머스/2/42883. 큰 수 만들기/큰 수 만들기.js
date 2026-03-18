function solution(number, k) {
    const stack = [];
    let remainK = k;
    
    for(let i = 0; i < number.length; i++) {
        const current = Number(number[i]);
        let prev = stack[stack.length - 1];
        
        // 현재 값보다 더 작은 값이 앞에 위치하면 삭제
        while(current > prev && remainK > 0) {
            stack.pop();
                
            prev = stack[stack.length - 1];
            remainK -= 1;
        }
        
        stack.push(current);
    }
    
    // 현재 값보다 더 작은 값이 앞에 없는 것이므로 마지막부터 pop하기
    if(remainK > 0) {
        for(let i = 0; i < remainK; i++) {
            stack.pop();
        }
    }
        
    return stack.join('');
}