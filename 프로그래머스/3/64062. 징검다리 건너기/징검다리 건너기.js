function solution(stones, k) {
    let answer = 0;
    
    let low = 1;
    let high = 200000000;
    
    while(low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        let empty = 0;
        for(let i = 0; i < stones.length; i++) {
            if(stones[i] - mid <= 0) {
                empty += 1;
            }
            else {
                empty = 0;
            }
            
            if(empty >= k) {
                break;
            }
        }
        
        if(empty >= k) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
            answer = low;
        }
    }
    
    return answer;
}