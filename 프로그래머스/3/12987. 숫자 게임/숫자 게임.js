function solution(A, B) {
    let answer = 0;
    let indexA = 0;
    let indexB = 0;
    
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    while(indexA < A.length && indexB < B.length) {
        if(A[indexA] < B[indexB]) {
            answer += 1;
            indexA += 1;
            indexB += 1;
        }
        else if(A[indexA] > B[indexB]) {
            indexB += 1;
        }
        else {
            indexB += 1;
        }
    }
    
    return answer;
}