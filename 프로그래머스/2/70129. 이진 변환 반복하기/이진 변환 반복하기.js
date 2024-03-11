function solution(s) {
    let answer = [];
    let zero_cnt = 0;
    let flow = 0;
    
    // 이진변환
    const transition = (num) => {
        let result = '';
        while(num) {
            result = num % 2 + result;
            num = Math.floor(num / 2);
        }
        return result;
    }
    
    while(s !== '1') {
        // 0개수 확인, 제거 (특정 문자 기준으로 나눈 후 -1, 배열 길이 세면 해당 문자 개수를 구할 수 있음)
        let delete_zero_cnt = s.split('0').length - 1;
        zero_cnt += delete_zero_cnt;
    
        s = s.replace(/0/g, ''); // g: 전역 탐색
        let without_zero_length = s.length;
    
        // 이진 변환
        s = transition(without_zero_length);
        flow++;
    }
    
    answer.push(flow, zero_cnt);
    
    return answer;
}