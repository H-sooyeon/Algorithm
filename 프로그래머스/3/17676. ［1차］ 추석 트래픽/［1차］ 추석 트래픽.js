function solution(lines) {
    let answer = 0;
    
    if(lines.length === 1) {
        return 1;
    }
    
    const convertStrTimeToMS = (time) => {
        const [hh, mm, ss] = time.split(':').map(Number);
        let sec = hh * 3600 + mm * 60 + ss;
        
        return sec * 1000;
    }
    
    const times = [];
    lines.forEach((line) => {
        const [date, time, processing] = line.split(' ');
        const duration = Number(processing.split('s')[0]);
        
        const convertedTime = convertStrTimeToMS(time);
        const startTime = convertedTime - duration * 1000 + 1;
        const endTime = convertedTime + 999;
        
        times.push(['START', startTime]);
        times.push(['END', endTime]);
    })
    
    times.sort((a, b) => {
        if(a[1] === b[1]) return -1;
        return a[1] - b[1];
    });
    
    let cnt = 0;
    for(let route of times) {
        const [type, time] = route;
        if(type === 'START') {
            cnt += 1;
        }
        else if(type === 'END') {
            answer = Math.max(answer, cnt);
            cnt -= 1;
        }
    }
        
    return answer;
}