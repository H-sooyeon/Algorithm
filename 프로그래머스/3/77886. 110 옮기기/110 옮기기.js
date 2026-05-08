function solution(s) {
    let answer = [];
    
    // 먼저 110을 모두 추출해 개수를 센다.
    const find110 = (x) => {
        let cnt = 0;
        const stack = [];
        
        for(const char of x) {
            stack.push(char);
            
            if(stack.length >= 3 && 
               stack[stack.length - 3] === '1' && 
               stack[stack.length - 2] === '1' && 
               stack[stack.length - 1] === '0') {
                stack.pop();
                stack.pop();
                stack.pop();
                cnt += 1;
            }
        }
        
        return {x: stack.join(''), cnt};
    }
    
    for(let str of s) {
        const {x, cnt} = find110(str);
        // 남은 문자열에서 '110'이 들어갈 위치 찾기
        // 마지막 0의 바로 뒤에 몰아넣는다.
        const lastZeroIdx = x.lastIndexOf('0');
    
        if(lastZeroIdx === -1) {
            answer.push('110'.repeat(cnt) + x);
            continue;
        }
    
        const result = x.slice(0, lastZeroIdx + 1) + '110'.repeat(cnt) + x.slice(lastZeroIdx + 1);
        answer.push(result);
    }
    
    return answer;
}