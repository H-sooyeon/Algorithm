function solution(n, s) {
    if(n > s) return [-1];
    
    let answer = [];

    // 기본으로 나눠줄 수 있는 값 나누기
    const base = Math.floor(s / n);
    for(let i = 0; i < n; i++) {
        answer.push(base);
    }
    
    // 기본값을 제외한 나머지 값 나누기
    const remain = s - (base * n);
    for(let i = 0; i < remain; i++) {
        answer[i] += 1;
    }
        
    return answer.reverse();
}