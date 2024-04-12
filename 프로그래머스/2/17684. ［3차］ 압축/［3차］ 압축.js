function solution(msg) {
    let answer = [];
    msg = msg.split('');
    
    // A-Z 사전 생성
    let dic = Array.from({length: 26}, (_, idx) => String.fromCharCode(idx + 65));
    
    while(msg.length) {
        let w = msg.shift();
        let w_include_check = dic.indexOf(w);
        // 사전에 포함되는 글자를 모두 찾기, 찾을 수 있는 문자 w에서 제거
        while(true) {
            let check = 0;
            if(msg.length) {
                check = dic.indexOf(w + msg[0]);
                if(check > 0) {
                    w += msg.shift();
                    w_include_check = check;
                } else break;
            } else  break;
        }
        
        // 색인 번호 출력
        answer.push(w_include_check + 1);
        
        // w+c 사전 등록
        if(msg.length) {
            dic.push(w + msg[0]);
        }
    }
        
    return answer;
}