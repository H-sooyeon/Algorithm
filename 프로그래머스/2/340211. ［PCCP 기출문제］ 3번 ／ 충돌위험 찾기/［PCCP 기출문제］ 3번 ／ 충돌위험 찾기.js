// (r,c) 최단 경로가 여러 가지일 경우 r 좌표가 c 좌표보다 먼저
// 맨헤튼 거리
function solution(points, routes) {
    let answer = 0;
        
    let robots = [];
    const robotsDes = {};
    const initialPosMap = new Map();
    
    for(let i = 0; i < routes.length; i++) {
        const [start, end, ...rest] = routes[i];
        robots.push([i, ...points[start - 1]]); // [로봇 번호, y, x];
        robotsDes[i] = end;
        
        const key = `${points[start-1][0]},${points[start-1][1]}`;
        initialPosMap.set(key, (initialPosMap.get(key) || 0) + 1);

        if(rest) {
            routes[i] = rest;
        }
    }
    
    for(let [key, value] of initialPosMap) {
        if(value > 1) answer += 1;
    }
    
    // console.log(robotsDes);
    // console.log(routes);
    const findNextPos = (cur, robotNum) => {
        const [dy, dx] = points[robotsDes[robotNum]-1];
        const [cy, cx] = cur;
                
        if(dy === cy) {
            // x 좌표 이동
            if(dx > cx) return [cy, cx + 1];
            return [cy, cx - 1];
        }
        else {
            // y 좌표 이동
            if(dy > cy) return [cy + 1, cx];
            return [cy - 1, cx];
        }
    }
    
    // 이동해야 하는 로봇들이 남아있다면 계속 진행
    while(robots.length) {
        // 로봇들의 다음 위치 찾기
        const posMap = new Map();
        const nextRobots = [];
        
        // [로봇 번호, y, x]
        for(let [num, y, x] of robots) {
            let [dy, dx] = points[robotsDes[num] - 1];
            
            if(dy === y && dx === x) {
                if(routes[num].length > 0) {
                    robotsDes[num] = routes[num][0];
                    routes[num].shift();
                    [dy, dx] = points[robotsDes[num] - 1];
                    // console.log(routes);
                    // console.log(robotsDes);
                }
                else continue;
            };
            const [ny, nx] = findNextPos([y, x], num);
            
            // console.log(num, ny, nx, 'des', dy, dx);
            const key = `${ny},${nx}`
            posMap.set(key, (posMap.get(key) || 0) + 1);
            nextRobots.push([num, ny, nx]);
        }
        
        for(let [key, value] of posMap) {
            if(value > 1) answer += 1;
        }
        // console.log(posMap);
        robots = nextRobots;
    }
    
    return answer;
}