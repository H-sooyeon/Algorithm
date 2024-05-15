function solution(targets) {
    let answer = 0;
    let overlap = [];
    
    targets.sort((a, b) => a[0] - b[0]);
    
    // console.log(targets);
    
    overlap.push(targets[0]);
    for(let i = 1; i < targets.length; i++) {
        let [pre_start, pre_end] = overlap[overlap.length - 1];
        let [next_start, next_end] = targets[i];
        
        // 겹친다. overlap 수정
        if(pre_end > next_start) {
            overlap.pop();
            // console.log(i, '번째 ', pre_start, pre_end, next_start, next_end);
            if(next_end >= pre_end) {
                // console.log('겹친다! ', next_start, pre_end);
                overlap.push([next_start, pre_end]);
                // console.log('넣은 후 targets', targets)
            }
            else {
                // onsole.log('겹친다! ', next_start, next_end);
                overlap.push([next_start, next_end]);
                // console.log('넣은 후 targets', targets)
                
            }
        }
        else {
            // 겹치지 않는다. overlap 추가
            overlap.push([next_start, next_end]);
        }
    }
    
    // console.log(overlap);
    
    return overlap.length;
}