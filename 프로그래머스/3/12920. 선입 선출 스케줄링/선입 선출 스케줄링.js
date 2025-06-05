function solution(n, cores) {
    let answer = 0;
    
    if(cores.length >= n) {
        return n;
    }
    
    // 5개를 먼저 처리하도록 한 후 마지막 1개의 작업을 누가 처리하게 되는지를 확인
    let start = Math.min(...cores);
    let end = start * n;
    
    let time = start;
    while(start <= end) {
        const mid = Math.floor((start + end) / 2);
        
        let cnt = cores.length;
        cores.forEach((core) => {
            cnt += Math.floor(mid / core);
        })
        
        if(cnt >= n) {
            end = mid - 1;
            time = mid;
        }
        else {
            start = mid + 1;
        }
    }
    
    let work = cores.length;
    const prevTime = time - 1; // 마지막 시간 전
    
    cores.forEach((core) => {
        work += Math.floor(prevTime / core);
    })
        
    for(let i = 0; i < cores.length; i++) {
        if(time % cores[i] === 0) work += 1;
        
        if(work >= n) {
            answer = i + 1;
            break;
        }
    }
        
    return answer;
}