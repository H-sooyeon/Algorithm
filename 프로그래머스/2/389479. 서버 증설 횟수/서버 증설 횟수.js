// 운영중인 서버에 대한 정보(증설 시작 시간/개수, queue)를 저장
// 서버 상태를 확인할 때 while로 반납할 서버 탐색
function solution(players, m, k) {
    let answer = 0;
    const runningServer = [];
    let serverCnt = 0;
    
    // i = 시간대
    for(let i = 0; i < players.length; i++) {
        const player = players[i];
        
        while(runningServer.length) {
            const preServer = runningServer[0];
            if(i - preServer.addTime >= k) {
                // 서버 반납
                const cnt = preServer.cnt;
                serverCnt -= cnt;
                runningServer.shift();
            } else break;
        }
        
        if(m > player) {
            continue;
        }
        
        const requireServerCnt = Math.floor(player / m);
        if(requireServerCnt > serverCnt) {
            // 추가 서버 필요
            answer += requireServerCnt - serverCnt;
            runningServer.push({addTime: i, cnt: requireServerCnt - serverCnt});
            serverCnt = requireServerCnt;
        }
    }
    
    return answer;
}