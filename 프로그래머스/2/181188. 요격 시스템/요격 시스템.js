// 미사일을 최소로 사용해 폭격 미사일을 요격한다.
// A 나라 미사일 x 축 평행 직선 형태 (s, e)
// B 나라 미사일 y 축 평행 직선 형태 (s, e)
function solution(targets) {
    let answer = 1;
    
    targets.sort((a, b) => {
        if(a[0] === b[0]) return b[1] - a[1];
        return a[0] - b[0];
    });
        
    let start = targets[0][0];
    let end = targets[0][1];
    
    // console.log(targets);
    // console.log('initial', start, end);
    for(let i = 1; i < targets.length; i++) {
        const target = targets[i];
        
        // console.log('target', target);
        if(end > target[1]) {
            start = target[0];
            end = target[1];
            // console.log('end > target[1]', start, end);
            continue;
        }
        
        if(end > target[0]) {
            start = target[0];
            // console.log('end > target[0]', start, end);
            continue;
        }
        
        answer += 1;
        start = target[0];
        end = target[1];
        // console.log('remain', start, end);
    }
    
    return answer;
}