function solution(n, t, m, timetable) {
    let answer = '';
    const busArriveTime = [];
    const crewArriveTimeTable = [];
    // 마지막으로 오는 버스의 시간을 계산해서, 그 후로 오는 크루들은 crewArriveTimeTable에 넣지 않는다.
    let lastBusArriveTime = 60 * 9 + ((n - 1) * t);
        
    const convertTimeToMin = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        const res = hh * 60 + mm;
        
        return res;
    }
    
    const convertMinToTime = (min) => {
        let hh = Math.floor(min / 60);
        let mm = min % 60;
        
        if(hh < 10) {
            hh = `0${hh}`;
        }
        if(mm < 10) {
            mm = `0${mm}`;
        }
        
        return `${hh}:${mm}`;
    }
    
    timetable.forEach((time) => {
        const crewTime = convertTimeToMin(time);
        if(lastBusArriveTime >= crewTime) {
            crewArriveTimeTable.push(crewTime);
        }
    })
    
    crewArriveTimeTable.sort((a, b) => a - b);
    
    let lastBusStop = 60 * 9;
    for(let i = 0; i < n; i++) {
        busArriveTime.push(lastBusStop);
        lastBusStop += t;
    }
        
    let cornArriveTime = -1;
    let crewIdx = 0;
    busArriveTime.forEach((arriveTime, busIdx) => {
        let numberOfPassengers = 0;
        for(let i = crewIdx; i < crewArriveTimeTable.length; i++) {
            const crewArriveTime = crewArriveTimeTable[i];
            // console.log('crewArriveTime', crewArriveTime, 'crewIdx', crewIdx);
            
            if(busIdx === busArriveTime.length - 1) { // 마지막 버스일 때
                // console.log('마지막 버스!', numberOfPassengers);
                if(numberOfPassengers + 1 === m) { // 더 탈 수 있는 인원이 없다면
                    // console.log('콘이 타아야해!!');
                    // 현재 크루의 도착 시간이 셔틀에 탈 수 있는 시간이 아니라면 이전 크루보다 먼저 와야함
                    if(crewArriveTime > arriveTime) {
                        if(i > 0) { // 이전 크루가 있을 때
                            cornArriveTime = crewArriveTimeTable[i-1] - 1;
                        } else { // 이전 크루가 없을 때
                            cornArriveTime = arriveTime;
                        }
                        
                    }
                    else {
                        cornArriveTime = crewArriveTime - 1; // 1분 일찍 오면 됨
                    }
                    break;
                }
            }
            
            if(crewArriveTime > arriveTime || numberOfPassengers >= m) {
                // console.log('해당 크루는 이 버스 못 타. 늦게 왔어.', crewArriveTime, arriveTime);
                break;
            }
            
            crewIdx += 1;
            numberOfPassengers += 1;
        }
    })
    
    if(cornArriveTime === -1) {
        return convertMinToTime(lastBusArriveTime);
        
    }
    
    return convertMinToTime(cornArriveTime);
}