function solution(n, times) {
    let answer = 0;
    
    let low = 1;
    let high = Math.max(...times) * n;
    
    while(low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        let cnt = 0;
        times.forEach((time) => {
            cnt += Math.floor(mid / time);
        })
        
        if(cnt >= n) {
            high = mid - 1;
            answer = mid;
        }
        else {
            low = mid + 1;
        }
    }
    
    return answer;
}