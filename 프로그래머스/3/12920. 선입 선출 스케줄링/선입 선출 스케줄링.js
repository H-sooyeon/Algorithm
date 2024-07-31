function solution(n, cores) {
    let answer = 0;
    
    if(cores.length >= n) {
        return n;
    }
    
    // 처음 사람이 작업하고 끝날 수 있음
    let low = Math.min(...cores);
    // 혼자서 모든 작업을 해야 할 수도 있음
    let high = low * n;
    let work;
    
    while(low <= high) {
        let mid = Math.floor((high + low) / 2);
        work = cores.length;
        
        // mid 시간동안 작업할 수 있는 양이 n과 같다면 갱신
        for(let i = 0; i < cores.length; i++) {
            work += Math.floor(mid / cores[i]);
        }
        
        if(work < n) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    
    work = cores.length;
    let prevTime = low - 1;
    
    for(let i = 0; i < cores.length; i++) {
        work += Math.floor(prevTime / cores[i]);
    }
        
    for(let i = 0; i < cores.length; i++) {
        if(low % cores[i] === 0) work++;
        
        if(n === work) {
            answer = i + 1;
            break;
        }
    }
    
    return answer;
}