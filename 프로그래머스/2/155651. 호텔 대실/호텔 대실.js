function solution(book_time) {
    let answer = 0;
    let time = [];
    let room = [];
    
    book_time.forEach(([start, end], idx) => {
        let startTime = start.split(':').map(Number);
        let endTime = end.split(':').map(Number);
        endTime[1] += 10;
        
        let startMin = startTime[0] * 60 + startTime[1];
        let endMin = endTime[0] * 60 + endTime[1];
        
        time.push([startMin, endMin]);
    })
    
    time.sort((a, b) => a[0] - b[0]);
    
    // console.log(time);
    
    for(let i = 0; i < time.length; i++) {
        let flag = true;
        
        for(let j = 0; j < room.length; j++) {
            // 모든 room을 돌며 현재 time이 들어갈 수 있는 곳이 있는지 확인
            // j번째 room의 끝나는 시간과 i번째 time의 끝나는 시간을 비교해서
            // time이 더 크면 그때의 j번째 room에 할당
            // 오름차순으로 정렬되어 있기 때문에 다음 time 때 시작 시간은 모든 room의 시작 시간보다 느림
            if(room[j][1] <= time[i][0]) {
                // console.log('방에 들어갈 수 있어요', room[j], time[i]);
                room[j] = time[i];
                flag = false;
                break;
            }
        }
        
        // 들어갈 수 있는 방을 찾지 못하면 room 추가
        if(flag) {
            room.push(time[i]);
            // console.log('새로운 방으로!, room: ', room);
            // console.log('새로운 방으로!, time: ', time[i]);
            answer++;
        }
    }    
    
    return answer;
}