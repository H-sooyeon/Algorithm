// 트럭은 택배 상자를 최대 cap개 실을 수 있다.
// 배달과 수거를 마치고 물류창고까지 돌아올 수 있는 최소 이동 거리 구하기
function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    
    let delivery = 0;
    let pickup = 0;
    
    for(let i = n-1; i >= 0; i--) {
        let cnt = 0;
        
        if(deliveries[i] > 0 || pickups[i] > 0) {
            while(delivery < deliveries[i] || pickup < pickups[i]) {
                cnt += 1;
                delivery += cap;
                pickup += cap;
            }
            delivery -= deliveries[i];
            pickup -= pickups[i];
            
            if(cnt > 0) {
                answer += (cnt * (i + 1) * 2);
            }
        }
    }
    
    return answer;
}