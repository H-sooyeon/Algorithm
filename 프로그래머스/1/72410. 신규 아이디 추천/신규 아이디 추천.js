function solution(new_id) {
    let answer = '';
    
    // 1. 소문자로 치환
    new_id = new_id.toLowerCase();
    
    // 2. 소문자, 숫자, 빼기, 밑줄, 마침표 제외 모든 문자 제거
    let s = '';
    for(let i = 0; i < new_id.length; i++) {
        if((new_id[i] >= 'a' && new_id[i] <= 'z') || (new_id[i] >= '0' && new_id[i] <= '9') || new_id[i] === '-' || new_id[i] === '_' || new_id[i] === '.') {
            s += new_id[i];
        }
    }
    
    // 3. 마침표가 2번 이상 연속된 부분 하나의 마침표로 치환
    let stack = [s[0]];
    for(let i = 1; i < s.length; i++) {
        if(stack[stack.length - 1] !== '.' || s[i] !== '.') {
            stack.push(s[i]);
        }
    }
    
    // 4. 마침표가 처음이나 끝에 위치한다면 제거
    if(stack[0] === '.') stack.shift();
    if(stack[stack.length - 1] === '.') stack.pop();
    
    // 5. 빈 문자열이라면 'a' 대입
    if(stack.length === 0) stack.push('a');
    
    // 6. 길이가 16자 이상이면 첫 15개 문자 제외 모두 제거
    if(stack.length >= 16) {
        stack = stack.slice(0, 15);
        if(stack[stack.length - 1] === '.') stack.pop();
    }
    
    // 7. 길이가 2자 이하면 마지막 문자를 길이가 3이 될 때까지 반복해서 붙이기
    if(stack.length <= 2) {
        while(stack.length <= 2) {
            stack.push(stack[stack.length - 1]);
        }
    }
    
    
    return stack.join('');
}