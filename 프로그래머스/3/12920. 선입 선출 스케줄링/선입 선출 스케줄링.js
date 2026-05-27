function solution(n, cores) {
    let answer = 0;
    
    // 모든 일이 언제 끝나는지 시간 알아내기
    let endTime = 0;
    let left = 1;
    let right = Number.MAX_SAFE_INTEGER;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        let count = cores.length;
        
        for(let i = 0; i < cores.length; i++) {
            count += Math.floor(mid / cores[i]);
        }
        
        if(count >= n) {
            right = mid - 1;
            endTime = mid;
        }
        else {
            left = mid + 1;
        }
    }
    
    // 0초 작업 할당
    let remainWorkload = n - cores.length;
    if(remainWorkload <= 0) return n;
    
    for(let i = 0; i < cores.length; i++) {
        remainWorkload -= Math.floor((endTime - 1) / cores[i]);
    }
    
    for(let i = 0; i < cores.length; i++) {
        if(endTime % cores[i] === 0) {
            remainWorkload -= 1;
        }
        
        if(remainWorkload === 0) return i + 1;
    }
    // console.log(remainWorkload)
    
    return -1;
    // 마지막 작업을 처리하는 코어의 번호
}