function solution(n,a,b) {
    let answer = 1;

    while(true) {
        if(a % 2 === 0 || b % 2 === 0) {
            // 둘 중 하나가 짝수이고, 짝수 - 1이 나머지 하나면 끝
            if(a % 2 === 0) {if(a - 1 === b) break;}
            else {if(b - 1 === a) break;}
        }
        
        a = Math.ceil(a / 2);
        b = Math.ceil(b / 2);
        answer++;
    }

    return answer;
}