function solution(jobs) {
    let answer = 0;
    
    jobs.sort((a, b) => a[0] - b[0]);
    
    let waiting = [];
    let idx = 0;
    
    let endTime = 0;
    while(idx < jobs.length || waiting.length > 0) {
        if(idx < jobs.length && endTime >= jobs[idx][0]) {
            // 이전 작업이 아직 작업중이면 대기 리스트에 추가
            waiting.push(jobs[idx]);
            // 작업 시간이 짧은 순으로 정렬
            waiting.sort((a, b) => a[1] - b[1]);
            idx++;
            continue;
        }
        
        // 대기하는 작업이 없다면
        if(!waiting.length) {
            endTime = jobs[idx][0];
        }
        else {
            // 대기하는 작업이 있다면
            let job = waiting.shift();
            endTime = endTime + job[1];
            answer += endTime - job[0];
        }
    }
    
    answer = Math.floor(answer / jobs.length);
    
    return answer;
}