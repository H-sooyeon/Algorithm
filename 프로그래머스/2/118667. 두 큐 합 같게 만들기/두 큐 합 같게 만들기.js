function solution(queue1, queue2) {
    let queue1Sum = queue1.reduce((acc, cur) => acc + cur, 0);
    let queue2Sum = queue2.reduce((acc, cur) => acc + cur, 0);
    
    if(queue1Sum === queue2Sum) return 0;
    const total = queue1Sum + queue2Sum;
    
    // 홀수는 두 큐를 같게 만들 수 없음
    if(total % 2 === 1) return -1;
    
    let target = total / 2;
    const queue = [...queue1, ...queue2];
    
    let p1 = 0;
    let p2 = queue1.length;
    
    for(let i = 0; i < queue1.length * 3; i++) {
        if(queue1Sum === target) {
            return i;
        }
        
        if(queue1Sum > target) {
            queue1Sum -= queue[p1];
            p1 += 1;
        }
        else {
            queue1Sum += queue[p2];
            p2 += 1;
        }
    }
    
    return -1;
}