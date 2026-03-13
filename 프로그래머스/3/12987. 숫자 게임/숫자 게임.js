function solution(A, B) {
    let answer = 0;
    
    const sortedA = A.sort((a, b) => b - a);
    const sortedB = B.sort((a, b) => b - a);
    
    let left = 0;
    let right = sortedB.length - 1;
    let aIdx = 0;
    while(left <= right) {
        if(sortedA[aIdx] < sortedB[left]) {
            answer += 1;
            left += 1;
        }
        else {
            right -= 1;
        }
        aIdx += 1;
    }
    
    return answer;
}