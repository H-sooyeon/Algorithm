function solution(n, stations, w) {
    let answer = 0;
    const range = w * 2 + 1;
    
    for(let i = 0; i < stations.length; i++) {
        let diff = 0;
        
        if(i === 0) {
            diff = stations[i] - w - 1;
        } else {
            diff = (stations[i] - stations[i-1]) - 2 * w - 1;
        }
        
        if(diff < 0) continue;
        
        answer += Math.ceil(diff / (w * 2 + 1));
    }
    
    // 마지막
    if((n - stations[stations.length - 1] - w) > 0) {
        answer += Math.ceil((n - stations[stations.length - 1] - w) / (w * 2 + 1))
    }
    

    return answer;
}