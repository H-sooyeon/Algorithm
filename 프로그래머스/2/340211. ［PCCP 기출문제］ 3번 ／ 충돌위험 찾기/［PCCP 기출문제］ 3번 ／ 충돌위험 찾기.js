// 로봇이 2대 이상 한 좌표에 모이는 경우를 모두 더한다.
// 장애물이 없으므로 맨헤튼거리를 계산한다.
function solution(points, routes) {
    let answer = 0;
    const xMax = Math.max(...points.map(([y, x]) => x)) + 1;
    const yMax = Math.max(...points.map(([y, x]) => y)) + 1;
    
    // system[y][x][time] = 로봇 수
    const system = Array.from({length: yMax}, () => Array.from({length: xMax}, () => new Map()));

    // 시작점에서의 로봇 위치 기록
    const startPosition = new Map();
    
    routes.forEach((route) => {
        let time = 0;
        let currentPosition;
        
        const firstPointIndex = route[0] - 1;
        const [sy, sx] = [points[firstPointIndex][0], points[firstPointIndex][1]];
        
        const startPosKey = `${sy},${sx}`;
        startPosition.set(startPosKey, (startPosition.get(startPosKey) || 0) + 1);
        
        for(let i = 1; i < route.length; i++) {
            const startPointIdx = route[i-1] - 1;
            const desPointIdx = route[i] - 1;
            
            const [sy, sx] = [points[startPointIdx][0], points[startPointIdx][1]];
            const [dy, dx] = [points[desPointIdx][0], points[desPointIdx][1]];
            
            const moveY = dy - sy; // +: 아래로, -: 위로
            const moveX = dx - sx; // +: 오른쪽, -: 왼쪽
            
            let [curY, curX] = [sy, sx];
            let remainY = Math.abs(moveY);
            let remainX = Math.abs(moveX);
            
            while(remainY > 0) {
                time += 1;
                if(moveY > 0) curY += 1;
                else curY -= 1;
                remainY -= 1;
                
                // 시간별 위치 기록
                const posMap = system[curY][curX];
                posMap.set(time, (posMap.get(time) || 0) + 1);
            }
            
            while(remainX > 0) {
                time += 1;
                if(moveX > 0) curX += 1;
                else curX -= 1;
                remainX -= 1;
                
                const posMap = system[curY][curX];
                posMap.set(time, (posMap.get(time) || 0) + 1);
            }
        }
    })
    
    // 출발 위치에서의 충돌 확인
    for(const [pos, count] of startPosition) {
        if(count >= 2) answer += 1;
    } 
    
    for(let y = 0; y < yMax; y++) {
        for(let x = 0; x < xMax; x++) {
            const timeMap = system[y][x];
            
            for(const [time, count] of timeMap) {
                if(count >= 2) answer += 1;
            }
        }
    }
    
    return answer;
}