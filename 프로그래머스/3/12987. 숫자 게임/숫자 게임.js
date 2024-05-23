function solution(A, B) {
    let answer = 0;
    
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    let aP = 0;
    let bP = 0;
    while(bP !== B.length) {
        if(A[aP] < B[bP]) {
            aP++;
            answer++;
        }
        bP++;
    }
    
    return answer;
}