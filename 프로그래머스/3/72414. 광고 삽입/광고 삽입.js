function solution(play_time, adv_time, logs) {
    let answer = '';
    
    const convertTimeToSec = (time) => {
        const [hh, mm, ss] = time.split(':').map(Number);
        
        let convertedTime = hh * 3600 + mm * 60 + ss;
        return convertedTime;
    }
    
    const convertTimeToStr = (time) => {
        const hh = Math.floor(time / 3600);
        const mm = Math.floor(time % 3600 / 60);
        const ss = time % 60;
        
        return `${hh < 10 ? '0': ''}${hh}:${mm < 10 ? '0' : ''}${mm}:${ss < 10 ? '0' : ''}${ss}`;
    }
    
    const secPlayTime = convertTimeToSec(play_time);
    const mediaPlayTime = new Array(secPlayTime + 1).fill(0);
    const advSecTime = convertTimeToSec(adv_time);
    
    // 시청자 재생 구간 저장
    logs.forEach((log) => {
        const [start, end] = log.split('-');
        
        const convertedStartTime = convertTimeToSec(start);
        const convertedEndTime = convertTimeToSec(end);
        
        mediaPlayTime[convertedStartTime] += 1;
        mediaPlayTime[convertedEndTime] -= 1;
    })
    
    // 1차. 각 시청자 누적합
    for(let i = 1; i <= secPlayTime; i++) {
        mediaPlayTime[i] += mediaPlayTime[i-1];
    }
    
    // 2차. 시청자 재생 시간 누적
    for(let i = 1; i <= secPlayTime; i++) {
        mediaPlayTime[i] += mediaPlayTime[i-1];
    }
    
    let resultTime = 0;
    let save = mediaPlayTime[advSecTime];
    for(let i = advSecTime; i <= secPlayTime; i++) {
        if(mediaPlayTime[i] - mediaPlayTime[i-advSecTime] > save) {
            resultTime = i - advSecTime + 1;
            save = mediaPlayTime[i] - mediaPlayTime[i-advSecTime];
        }
    }
        
    return convertTimeToStr(resultTime);
}