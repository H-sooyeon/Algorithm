function solution(plans) {
    let answer = [];
    let save = [];
    
    // 문자열 과제 시작 시간 -> 분 단위 정수로 변경
    plans.forEach((v, idx) => {
        let [h, m] = v[1].split(':').map(Number);
        plans[idx][1] = 60 * h + m;
        plans[idx][2] = Number(plans[idx][2]);
    })
    
    // 과제 시작 시간 순으로 정렬
    plans.sort((a, b) => a[1] - b[1]);
    
    let plan = plans[0];
    for(let i = 1; i < plans.length; i++) {
        let gap = plans[i][1] - plan[1];
        if(gap < plan[2]) {
            // 최대한 할 수 있는 만큼 하고 저장해두기
            save.push([plan[0], plan[2] - gap]);
            // console.log('최대한 해놓기', plan);
        }
        else {
            // 시간 안에 다 할 수 있을 때
            // console.log('다 할 수 있을 때', plan);
            answer.push(plan[0]);
            let remain = gap - plan[2];
            if(remain === 0) {
                plan = plans[i];
                continue;
            }
            
            // 시간이 남는다면 저장해둔 과제 최근거부터 하기
            for(let j = save.length - 1; j >= 0; j--) {
                if(save[j][1] - remain <= 0) {
                    // 저장해둔 과제 하나 해치울 수 있을 때
                    remain -= save[j][1];
                    answer.push(save[j][0]);
                    save.pop();
                }
                else {
                    // 해치우지 못할 때
                    save[j][1] -= remain;
                    break;
                }
            }
        }
        plan = plans[i];
    }
    
    // 마지막 과제는 다 할 때까지 한 번에 처리
    answer.push(plans[plans.length - 1][0]);
    
    // 다 끝내지 못한 배열을 최근거부터 하나씩 해치우기
    // console.log(save);
    for(let i = save.length - 1; i >= 0; i--) {
        answer.push(save[i][0]);
    }
    
    return answer;
}