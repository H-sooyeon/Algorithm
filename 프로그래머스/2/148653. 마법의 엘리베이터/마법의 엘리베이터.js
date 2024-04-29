function solution(storey) {
    let answer = 0;
    storey = storey.toString();
    let arr = storey.split('').map(Number);
    
    for(let i = arr.length - 1; i > 0; i--) {
        // console.log(arr[i]);
        if(arr[i] === 10) {
            arr[i-1]++;
            arr[i] = 0;
        }
        else if(arr[i] > 5) {
            // 올라가기
            arr[i-1]++;
            answer += (10 - arr[i]);
            arr[i] = 0;
        }
        else if(arr[i] === 5) {
            if(arr[i-1] >= 5) {
                // 올라가기
                arr[i-1]++;
                answer += 10 - arr[i];
                arr[i] = 0;
            }
            else {
                // 내려가기
                answer += arr[i];
                arr[i] = 0;
            }
        }
        else {
            // 내려가기
            answer += arr[i];
            arr[i] = 0;
        }
    }
    
    if(arr[0] > 5) answer += (10 - arr[0] + 1);
    else answer += arr[0];
    
    return answer;
}