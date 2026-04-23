// 먼 곳부터 배달
function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    let delivery = 0;
    let pickup = 0;
    
    for(let i = n - 1; i >= 0; i--) {
        let cnt = 0; // 방문 횟수
        
        // 배달 혹은 수거할 게 있는데 한 번에 가능하지 않는다면
        while(delivery < deliveries[i] || pickup < pickups[i]) {
            cnt += 1;
            delivery += cap;
            pickup += cap;
            // 용량 확보
        }
        
        delivery -= deliveries[i];
        pickup -= pickups[i];
        answer += (i + 1) * 2 * cnt;
    }
    
    return answer;
}