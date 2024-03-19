function solution(progresses, speeds) {
    let answer = [];
    let remainWorkDays = [];
    
    for(let i = 0; i < progresses.length; i++) {
        let remain = Math.ceil((100 - progresses[i]) / speeds[i]);
        remainWorkDays.push(remain);
    }
    
    console.log('origin', remainWorkDays);
    let cnt = 1;
    let prevCompleteWorkDay = remainWorkDays[0];
    remainWorkDays.shift();
    console.log('modify', remainWorkDays);
    
    for(let remainWorkDay of remainWorkDays) {
        if(prevCompleteWorkDay >= remainWorkDay) {
            cnt++;
        } else {
            answer.push(cnt);
            cnt = 1;
            prevCompleteWorkDay = remainWorkDay;
        }
        console.log(remainWorkDay, cnt);
        console.log(answer);
    }
    
    answer.push(cnt);
    
    return answer;
}