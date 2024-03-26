function solution(n, t, m, p) {
    let answer = '';
    
    let number = 0;
    let cnt = 0;
    while(t >= 0) {
        // 주어진 진법대로 배열로 만든다.
        let transition_number = number.toString(n).toUpperCase();
        // console.log('number: ',transition_number);
        for(let i = 0; i < transition_number.length; i++) {
            let tmp = (cnt + 1) % (m + 1);
            cnt = tmp === 0 ? 1 : tmp;
            if(cnt === p) {
                t--;
                answer += transition_number[i];
            }
            // console.log('answer: ', answer);
        }
        number++;
    }
    
    answer = answer.slice(0, t);
    
    return answer;
}