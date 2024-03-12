// 앞으로 + k, 건전지 사용량 - k
// 현재 온 거리 x 2, 건전지 사용량 x

// 짝수이면 갈 수 있는 만큼 이동, 홀수면 한 칸 이동
function solution(n) {
    let ans = 0;
    
    while(n) {
        if(n % 2) {
            n--;
            ans++;
        } else {
            n = n / 2;
        }
    }
    
    return ans;
}