function solution(stones, k) {
    let answer = 0;
    
    let left = 1;
    let right = 200000000;
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        let cnt = 0;
        // 연속으로 나오는 0 값이 얼마나 있는지 확인
        for(let i = 0; i < stones.length; i++) {
            if(cnt >= k) break;
            if(stones[i] - mid <= 0) {
                cnt++;
            }
            else {
                cnt = 0;
            }
        }
        
        if(cnt >= k) {
            right = mid - 1;
            answer = mid;
        }
        else {
            left = mid + 1;
        }
    }
    
    // console.log(answer);
    
    return answer;
}