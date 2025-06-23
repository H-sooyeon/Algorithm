function solution(operations) {
    let answer = [];
    let waiting = [];
    const queue = [];
    
    const checkWaitingValues = () => {
        const remains = [];
        for(let i = 0; i < waiting.length; i++) {
            const len = queue.length;
            if(queue[len - 1] > waiting[i]) {
                queue.push(waiting[i]);
            }
            else if(queue[0] < waiting[i]) {
                queue.unshift(waiting[i]);
            }
            else {
                remains.push(waiting[i]);
            }
        }
        
        waiting = [...remains];
    }
    
    operations.forEach((oper) => {
        let [command, value] = oper.split(' ');
        value = Number(value);
                
        if(command === 'I') {
            // queue의 양 끝 값 확인
            const len = queue.length;
            if(queue.length === 0) {
                queue.push(value);
                return;
            }
            
            if(queue[len - 1] >= value) {
                queue.push(value);
            }
            else if(queue[0] <= value) {
                queue.unshift(value);
            }
            else {
                // 기존의 queue보다 최대값도 아니고 최소값도 아니라면 대기
                waiting.push(value);
            }
        }
        if(command === 'D') {
            if(queue.length < 1) return;
            
            if(value === -1) { // 최소값 제거
                queue.pop();
            }
            else if(value === 1) { // 최대값 제거
                queue.shift();
            }
            
            // 대기 중인 수들을 비교해서 넣기
            checkWaitingValues();
        }
    })
    
    answer = [...waiting, ...queue];
    if(answer.length < 1) return [0, 0];
    else if(answer.length === 1) return [answer[0], answer[0]];
    
    answer.sort((a, b) => a - b);
    
    return [answer[answer.length - 1], answer[0]];
}