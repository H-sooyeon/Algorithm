const calculateTime = (time) => {
    const HHMMSS = time.split(':');
    const amount = HHMMSS[0] * 3600 + HHMMSS[1] * 60 + HHMMSS[2] * 1;
    
    return amount;
}

const formatterTime = (time) => {
    let HH = (Math.floor(time / 3600)).toString();
    let MM = Math.floor((Math.floor(time % 3600)) / 60).toString();
    let SS = (time % 60).toString();
    
    HH = HH.length < 2 ? '0' + HH : HH;
    MM = MM.length < 2 ? '0' + MM : MM;
    SS = SS.length < 2 ? '0' + SS : SS;
    
    return `${HH}:${MM}:${SS}`;
}

function solution(play_time, adv_time, logs) {
    let answer = '';
    const pt = calculateTime(play_time);
    const at = calculateTime(adv_time);
    const times = new Array(pt).fill(0);
    
    logs.forEach(log => {
        const [start, end] = log.split('-');
        const ws = calculateTime(start);
        const we = calculateTime(end);
        
        times[ws]++; // 시작하는 시간
        times[we]--; // 끝나는 시간
    })
    
    // 시청자 수 누적합
    for(let i = 1; i <= pt; i++) {
        times[i] += times[i-1];
    }
    
    // 누적 재생횟수 누접합
    for(let i = 1; i <= pt; i++) {
        times[i] += times[i-1];
    }
    
    let sum = times[at];
    let idx = 0;
    
    for(let i = at; i <= pt; i++) {
        if(sum < times[i] - times[i - at]) {
            sum = times[i] - times[i - at];
            idx = i - at + 1;
        }
    }
        
    return formatterTime(idx);
}