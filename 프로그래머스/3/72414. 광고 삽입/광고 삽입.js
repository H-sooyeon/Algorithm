function solution(play_time, adv_time, logs) {    
    const convertTimeToSec = (time) => {
        const [hh, mm, ss] = time.split(':').map(Number);
        return hh * 3600 + mm * 60 + ss;
    }
    
    const convertTimeToStr = (time) => {
        let hh = Math.floor(time / 3600);
        let mm = Math.floor((time % 3600) / 60);
        let ss = time % 60;
        
        if(hh < 10) hh = `0${hh}`;
        if(mm < 10) mm = `0${mm}`;
        if(ss < 10) ss = `0${ss}`;
        
        return `${hh}:${mm}:${ss}`;
    }
    
    const adPlayTime = convertTimeToSec(adv_time);
    const playTime = convertTimeToSec(play_time);
    const prefix = new Array(playTime + 1).fill(0);
    
    for(let log of logs) {
        const [startTime, endTime] = log.split('-');
        const start = convertTimeToSec(startTime);
        const end = convertTimeToSec(endTime);
        
        prefix[start] += 1;
        prefix[end] -= 1;
    }
    
    // 영화를 본 사람 수 누적
    for(let i = 1; i <= playTime; i++) {
        prefix[i] += prefix[i-1];
    }
    
    // 영화 재생 시간 누적
    for(let i = 1; i <= playTime; i++) {
        prefix[i] += prefix[i-1];
    }

    let maxPrefixPlayTime = prefix[adPlayTime - 1];
    let startTime = 0;
    
    for(let i = 1; i <= playTime - adPlayTime; i++) {
        const currentPlayTime = prefix[i + adPlayTime - 1] - prefix[i - 1];
        
        if(currentPlayTime > maxPrefixPlayTime) {
            maxPrefixPlayTime = currentPlayTime;
            startTime = i;
        }
    }
    
    return convertTimeToStr(startTime);
}