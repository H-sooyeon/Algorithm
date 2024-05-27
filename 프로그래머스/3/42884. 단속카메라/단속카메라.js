function solution(routes) {
    let answer = 1;
    
    // 정렬
    routes.sort((a, b) => a[0] - b[0]);
    
    let prev_end = routes[0][1];
    for(let i = 1; i < routes.length; i++) {
        let next_start = routes[i][0];
        let next_end = routes[i][1];
        
        if(prev_end < next_start) {
            answer++;
            prev_end = next_end;
        }
        else if(prev_end > routes[i][1]) {
            prev_end = routes[i][1];
        }
    }
    
    return answer;
}