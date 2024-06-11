function solution(s) {
    let answer = [0, 0];

    while(s !== '1') {
        s = s.split('').filter((v) => {
            if(v === '0') answer[1]++;
            return v !== '0';
        });
        s = s.length.toString(2);
        answer[0]++;
    }
    
    return answer;
}