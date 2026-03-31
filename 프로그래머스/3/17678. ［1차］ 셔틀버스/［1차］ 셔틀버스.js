// 셔틀 운행 횟수 n
// 셔틀 운행 간격 t
// 한 셔틀에 탈 수 있는 최대 크루 수 m
// 크루가 대기열에 도착하는 시각 timetable
function solution(n, t, m, timetable) {
    let answer = '';
    const busTime = [];
    
    const convertTimeToMin = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        return hh * 60 + mm;
    }
    
    const convertTimeToStr = (time) => {
        let hh = Math.floor(time / 60);
        let mm = time % 60;
        
        if(hh < 10) hh = '0' + hh;
        if(mm < 10) mm = '0' + mm;
        return hh + ':' + mm;
    }
    
    for(let i = 0; i < n; i++) {
        busTime.push(540 + i * t);
    }
    
    for(let i = 0; i < timetable.length; i++) {
        timetable[i] = convertTimeToMin(timetable[i]);
    }
    
    timetable = timetable.sort((a, b) => a - b);
    
    // console.log(timetable);
    let crewIdx = 0;
    for(let i = 0; i < busTime.length; i++) {
        let crewCnt = 0;
        // console.log('i:', i, 'crewIdx:', crewIdx, 'bus:', busTime[i]);
        for(let j = crewIdx; j < Math.min(crewIdx + m, timetable.length); j++) {
            if(busTime[i] < timetable[j]) {
                // console.log('버스 도착 시간보다 크루 도착 시간이 더 느려요');
                break;
            }
            
            // console.log(j);
            if(j === crewIdx + m - 1 && i === busTime.length - 1) {
                // console.log('마지막은 콘이 타야해요!');
                return convertTimeToStr(timetable[j] - 1);
            }
            
            crewCnt += 1;
        }
        crewIdx += crewCnt;
    }
    
    return convertTimeToStr(busTime[busTime.length-1]);
    
    return answer;
}