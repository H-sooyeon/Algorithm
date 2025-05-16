function solution(a) {
    let answer = 2;
    const n = a.length;
    const leftMinValueArr = new Array(n);
    const rightMinValueArr = new Array(n);
    
    leftMinValueArr[0] = a[0];
    rightMinValueArr[n-1] = a[n-1];
    
    for(let i = 1; i < a.length; i++) {
        leftMinValueArr[i] = Math.min(leftMinValueArr[i-1], a[i]);
    }
    for(let i = a.length - 2; i >= 0; i--) {
        rightMinValueArr[i] = Math.min(rightMinValueArr[i+1], a[i]);
    }
        
    for(let i = 1; i < n - 1; i++) {
        if(a[i] > leftMinValueArr[i] && a[i] > rightMinValueArr[i]) continue;
        answer += 1;
    }
    
    return answer;
}