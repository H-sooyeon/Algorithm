function solution(diffs, times, limit) {    
    // 숙련도의 최솟값을 찾는다.
    // 이분탐색으로 경우의 수를 계산해 최적의 값을 찾는다.
    
    let left = 1;
    let right = 100001;
    
    while(left < right) {
        const level = Math.floor((left + right) / 2);
        
        let requiredTime = 0;
        let timePrev = 0;
        for(let i = 0; i < diffs.length; i++) {
            const timeCur = times[i];
            const diff = diffs[i];
            
            if(level >= diff) {
                requiredTime += timeCur;
                timePrev = timeCur;
                continue;
            }

            requiredTime += (timePrev + timeCur) * (diff - level) + timeCur;
            timePrev = timeCur;
        }
        
        if(limit < requiredTime) {
            left = level + 1;
        }
        else {
            // limit >= requiredTime
            right = level;
        }
    }
        
    return right;
}