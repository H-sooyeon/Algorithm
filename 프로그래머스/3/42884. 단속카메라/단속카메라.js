// 모든 차량이 한 번은 단속용 카메라를 만나도록 하려면 최소 몇 대의 카메라를 설치해야 하는가
function solution(routes) {
    let answer = 1;
    const copy = routes.map((route) => [...route]);
    
    copy.sort((a, b) => {
        if(a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    })
    
    let prevEnd = copy[0][1];
    for(let i = 1; i < copy.length; i++) {
        const [curStart, curEnd] = copy[i];
        
        if(prevEnd >= curStart) {
            if(prevEnd > curEnd) {
                prevEnd = curEnd;
            }
            continue;
        }
        else {
            answer += 1;
            prevEnd = curEnd;
        }
    }
    
    return answer;
}