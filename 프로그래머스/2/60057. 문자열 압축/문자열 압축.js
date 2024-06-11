function solution(s) {
    let answer = s.length;
    
    for(let i = 1; i < s.length; i++) {
        let word = s.slice(0, i);
        
        let cnt = 0;
        let tmp = '';
        for(let j = word.length; j < s.length; j++) {
            if(word === s.slice(j, word.length + j)) {
                cnt++;
            }
            else {
                if(cnt) tmp += word + (cnt + 1);
                else tmp += word;
                cnt = 0;
                word = s.slice(j, word.length + j);
            }
            j += word.length - 1;
        }
        
        if(cnt) tmp += word + (cnt + 1);
        else tmp += word;
        
        answer = Math.min(answer, tmp.length);
        // console.log(tmp);
    }
    
    return answer;
}