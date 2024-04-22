function solution(storey) {
    let cnt = 0;
    let string_storey = storey.toString().split('');
    storey = string_storey.map(Number);
    
    for(let i = storey.length - 1; i >= 1; i--) {
        if(storey[i] < 5) {
            // 내리기
            cnt += storey[i];
            storey[i] = 0;
        }
        else if(storey[i] === 10) {
            storey[i-1]++;
            storey[i] = 0;
        }
        else if(storey[i] > 5) {
            // 더하기
            cnt += (10 - storey[i]);
            storey[i-1]++;
            storey[i] = 0;
        }
        else {
            cnt += 5;
            storey[i] = 0;
            // 앞의 자리가 5보다 크면 더하는게 더 적게 걸리니까 더하기
            // 앞의 자리가 5보다 작으면 내리는게 나으니까 빼기
            if(storey[i-1] >= 5) {
                storey[i-1]++;
            }
        }
    }
    
    // 올림해서 남은게 있을 경우, 빼기와 더하기 중 하나 선택
    console.log(storey);
    cnt += Math.min(storey[0], 10 - storey[0] + 1);
        
    return cnt;
}