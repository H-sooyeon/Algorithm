// 차례로 루트를 순회해 겹치는 구간에 대한 개수를 알아내자
function solution(routes) {
    let answer = 1;
    
    routes = routes.sort((a, b) => {
        if(a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    })
    
    let left = routes[0][0];
    let right = routes[0][1];
    
    for(let route of routes) {
        const [start, end] = route;
        if(right < start) {
            answer += 1;
            left = start;
            right = end;
        }
        else {
            if(left < start) {
                left = start;
            }
            if(right > end) {
                right = end;
            }
        }
    }
    
    
    return answer;
}