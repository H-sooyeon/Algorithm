function solution(n, stations, w) {
    let answer = 0;
    let arr = [];
    
    let idx = 0;
    for(let i = 0; i < stations.length; i++) {
        let start = stations[i] - w;
        let end = stations[i] + w;
        
        if(end > n) end = n;
        if(start < 1) start = 1;
        
        // 겹치는 구간이 있는지 체크
        if(idx !== 0) {
            let [prev_start, prev_end] = arr[idx - 1];
            
            if(prev_end >= start || prev_end === start - 1) {
                // 겹치는 구간이 있다면 겹치기
                arr[idx - 1] = [prev_start, end];
            }
            else {
                arr.push([start, end]);
                idx++;
                
                if(idx !== 1) {
                    let range = arr[idx - 1][0] - arr[idx - 2][1] - 1;
                    answer += Math.ceil(range / (w * 2 + 1));
                }
                else {
                    let range = arr[idx - 1][0] - 1;
                    answer += Math.ceil(range / (w * 2 + 1));
                }
            }
        }
        else {
            arr.push([start, end]);
            idx++;
            
            if(idx !== 1) {
                let range = arr[idx - 1][0] - arr[idx - 2][1] - 1;
                answer += Math.ceil(range / (w * 2 + 1));
            }
            else {
                let range = arr[idx - 1][0] - 1;
                answer += Math.ceil(range / (w * 2 + 1));
            }
        }
    };
    
    // console.log(arr);
    if(arr[arr.length - 1][1] < n) {
        answer += Math.ceil((n - arr[arr.length - 1][1]) / (w * 2 + 1));
    }
    
    return answer;
}