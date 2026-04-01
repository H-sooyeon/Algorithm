// 임의의 인접한 두 풍선을 고른 뒤, 두 풍선 중 하나를 터트린다.
// 터진 풍선으로 인해 풍선들 사이에 빈 공간이 생겼다면, 빈 공간이 없도록 풍선들을 중앙으로 밀착시킴
// 두 풍선 중 번호가 더 작은 풍선을 터트리는 행위는 1번만 할 수 있음
function solution(a) {
    if(a.length === 1) return 1;
    
    let answer = 2; // 양쪽 끝은 마지막까지 남음
    const leftMinValueArr = new Array(a.length);
    const rightMinValueArr = new Array(a.length);
    
    leftMinValueArr[0] = a[0];
    for(let i = 1; i < a.length; i++) {
        if(leftMinValueArr[i-1] > a[i]) leftMinValueArr[i] = a[i];
        else  leftMinValueArr[i] = leftMinValueArr[i-1];
    }
    rightMinValueArr[a.length - 1] = a[a.length - 1];
    for(let i = a.length - 2; i >= 0; i--) {
        if(rightMinValueArr[i+1] > a[i]) rightMinValueArr[i] = a[i];
        else rightMinValueArr[i] = rightMinValueArr[i+1];
    }
    
    for(let i = 1; i < a.length - 1; i++) {
        if(leftMinValueArr[i-1] < a[i] && rightMinValueArr[i + 1] < a[i]) continue;
        answer += 1;
    }
        
    
    return answer;
}