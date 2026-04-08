// 기존에 진행 중이던 과제가 있다면 진행 중이던 과제를 멈추고 새로운 과제 시작
// 진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면 멈춰둔 과제를 이어서 진행
// 과제를 끝낸 시각에 새로 시작해야 하는 과제와 잠시 멈춰 둔 과제가 모두 있다면, 새로 시작해야 하는 과제부터 진행
function solution(plans) {
    let answer = [];
    const waiting = [];
    
    const convertTimeToMin = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        return hh * 60 + mm;
    }
    
    const copy = plans.map(([name, start, playtime]) => {
        return [name, convertTimeToMin(start), Number(playtime)];
    }).sort((a, b) => a[1] - b[1]);
    
    
    let curPlan = null;
    // console.log(copy);
    for(let plan of copy) {
        const [name, start, playtime] = plan;
        // console.log(plan, 'cur', curPlan);
        // console.log('before waiting', waiting);
        
        if(curPlan === null) {
            curPlan = {name, start, playtime};
        }
        else if(curPlan.start + curPlan.playtime === start) {
            // 과제를 끝낸 시각에 새로 시작해야 하는 과제와 잠시 멈춰 둔 과제가 모두 있다면, 새로 시작해야 하는 과제부터 진행
            // console.log('끝남과 동시에 새로운 과제 시작!', curPlan.name);
            answer.push(curPlan.name);
            curPlan = {name, start, playtime};
        }
        else if(curPlan.start + curPlan.playtime < start) {
            // 진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면 멈춰둔 과제를 이어서 진행
            // 대기 중이던 과제들을 start - (curPlan.start + curPlan.playtime) 시간 만큼 진행한다.
            let diffTime = start - (curPlan.start + curPlan.playtime);
            // console.log('다음 과제 전에 지금 과제 끝낼 수 있어!', diffTime, '만큼 시간 남음');
            answer.push(curPlan.name);
            curPlan = {name, start, playtime};
            
            while(diffTime > 0 && waiting.length > 0) {
                let [waitingName, waitingStart, remainTime] = waiting.pop();
                
                if(remainTime > diffTime) {
                    waiting.push([waitingName, waitingStart, remainTime - diffTime]);
                    break;
                }
                else {
                    answer.push(waitingName);
                    diffTime -= remainTime;
                }
            }
        }
        else if(curPlan !== null) {
            // 기존에 진행 중이던 과제가 있다면 진행 중이던 과제를 멈추고 새로운 과제 시작
            waiting.push([curPlan.name, curPlan.start, curPlan.playtime - (start - curPlan.start)]);
            curPlan = {name, start, playtime};
        }
        
         // console.log('after waiting', waiting);
    }
    
    if(curPlan) {
        answer.push(curPlan.name);
    }

    while(waiting.length) {
        const [name, start, playtime] = waiting.pop();
        answer.push(name);
    }
    // console.log(waiting);
    // console.log(curPlan);
    
    return answer;
}