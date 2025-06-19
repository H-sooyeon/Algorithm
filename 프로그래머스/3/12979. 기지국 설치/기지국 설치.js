function solution(n, stations, w) {
    let answer = 0;
    let idx = 1;
    const divide = 2 * w + 1;
    
    stations.forEach((station) => {
        let left = station - w - 1;
        let right = station + w + 1;
        
        const range = left - idx + 1;
        const cnt = Math.ceil(range / divide);
        answer += cnt;
        
        idx = right;
    })
    
    if(idx <= n) {
        const lastStation = stations[stations.length - 1];
        const right = lastStation + w + 1;
        const range = n - right + 1;
        answer += Math.ceil(range / divide)
    }

    return answer;
}