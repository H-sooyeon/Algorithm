function solution(jobs) {
    let answer = 0;
    const waitingQueue = [];
        
    jobs.sort((a, b) => {
        if(a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    })
    
    let idx = 0; // 다음 확인할 작업에 대한 idx
    let processEndTime = 0;
    while(waitingQueue.length > 0 || idx < jobs.length) {
        // 이전 작업이 아직 작업중이라면 대기열에 추가
        if(idx < jobs.length && processEndTime >= jobs[idx][0]) {
            waitingQueue.push([...jobs[idx]]);
            idx += 1;
            
            continue;
        }
        
        // 대기열이 비어있다면 바로 실행
        if(waitingQueue.length === 0) {
            processEndTime = jobs[idx][0];
        }
        else {
            // 대기열이 비어있지 않다면 대기열 작업 중 빨리 끝나는 작업을 우선
            waitingQueue.sort((a, b) => a[1] - b[1]);
            const job = waitingQueue.shift();
            processEndTime += job[1];
            answer += processEndTime - job[0];
        }
    }
    
    
    return Math.floor(answer / jobs.length);
}