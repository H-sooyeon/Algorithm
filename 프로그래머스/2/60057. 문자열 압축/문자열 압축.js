function solution(s) {
    let answer = s.length;
    
    for(let i = 1; i <= s.length / 2; i++) {
        let makedStr = '';
        let cnt = 1; // 현재 압축 문자열을 포함하도록 초기값 설정
        let idx = i;
        
        let target = s.slice(0, i);
        while(idx <= s.length - 1) {
            const cur = s.slice(idx, idx + i);
            
            if(target === cur) {
                cnt += 1;
            }
            else {
                if(cnt < 2) makedStr += target;
                else makedStr += `${cnt}${target}`;

                target = cur;
                cnt = 1;
            }
            
            idx += i;
        }
        
        
        if (cnt > 1) makedStr += cnt + target;
        else makedStr += target;
        
        makedStr += s.slice(idx);
        
        answer = Math.min(makedStr.length, answer);
    }
    
    return answer;
}