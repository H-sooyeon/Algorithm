function solution(routes) {
    let answer = 1;
    
    routes.sort((a, b) => a[0] - b[0]);
    
    let camera = routes[0][1];
    for(let i = 1; i < routes.length; i++) {
        if(camera >= routes[i][0] && camera > routes[i][1]) {
            camera = routes[i][1];
        }
        if(camera < routes[i][0] && camera < routes[i][1]) {
            camera = routes[i][1];
            answer++;
        }
    }
    
    return answer;
}