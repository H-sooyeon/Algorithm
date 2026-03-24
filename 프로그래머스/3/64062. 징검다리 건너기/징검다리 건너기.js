function solution(stones, k) {
    let answer = 0;
    
    let left = 1;
    let right = 200000000;
    
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        let cnt = 0;
        let canPass = true;
        for(let i = 0; i < stones.length; i++) {
            if(stones[i] - mid < 0) {
                cnt += 1;
            }
            else cnt = 0;
            
            if(cnt >= k) {
                canPass = false;
                break;
            }
        }
        
        if(!canPass) {
            right = mid - 1;
        }
        else {
            answer = mid;
            left = mid + 1;
        }
    }
    
    return answer;
}