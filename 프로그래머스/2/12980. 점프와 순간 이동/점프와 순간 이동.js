function solution(n) {
    let answer = 0;
    
    // 도착 지점 -> 시작 지점으로 이동
    // 도착 지점부터 시작해서 짝수이면 갈 수 있는 만큼 이동
    // 홀수면 +1
    while(n) {
        if(n % 2 === 1) {
            n--;
            answer++;
        }
        else {
            n /= 2;
        }
    }
    
    
    return answer;
}