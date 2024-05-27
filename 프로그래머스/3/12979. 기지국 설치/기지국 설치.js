function solution(n, stations, w) {
    var answer = 0;

    let idx = 1;
    stations.forEach((station) => {
        let [start, end] = [station - w, station + w];
        if(idx > n) {
            return answer;
        }
        if(start > idx) {
            answer += Math.ceil((start - idx)/(2*w+1));
        }
        idx = end+1;
    })
    if(idx <= n) {
        answer += Math.ceil((n - idx + 1)/(2*w+1));
    }
    return answer;
}