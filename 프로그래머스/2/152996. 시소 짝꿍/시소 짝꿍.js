function solution(weights) {
    // 비율 1:1 2:4 3:4 3:2인 경우만 존재
    let answer = 0;
    let avail = [1/1, 2/4, 3/4, 2/3];
    let value = {};
    
    weights.sort((a, b) => a - b);
    
    weights.forEach((v, idx) => {
        avail.forEach((k, idx) => {
            let tmp = v * k;
            if(value[tmp]) {
                answer += value[tmp];
            }
        })
        
        if(!value[v]) value[v] = 1;
        else value[v]++;
    })
    
    return answer;
}