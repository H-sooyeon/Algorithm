function solution(scores) {
    let answer = 1;
    let incentive_employee = new Set();
    let wanho_sum = scores[0][0] + scores[0][1];
    let incentive = [];
    let employee = [];
    
    // key 값으로 사원 번호 할당
    scores.forEach((v, idx) => {
        employee.push([idx, ...v]);
    })
    
    employee.sort((a, b) => {
        if(a[1] === b[1]) {
            return a[2] - b[2];
        }
        return b[1] - a[1];
    })
            
    let prev = employee[0][2];
    incentive.push(employee[0]);
    incentive_employee.add(employee[0][0]);
    for(let i = 1; i < employee.length; i++) {
        if(prev > employee[i][2]) {
            continue;
        }
        incentive.push(employee[i]);
        incentive_employee.add(employee[i][0]);
        
        prev = employee[i][2];
    }
    
    // console.log(incentive);
    // console.log(incentive_employee);
    
    if(!incentive_employee.has(0)) {
        return -1;
    }
    
    for(let i = 0; i < incentive.length; i++) {
        let sum = incentive[i][1] + incentive[i][2];
        
        if (sum > wanho_sum) {
            answer++;
        }
    }
    
    return answer;
}