function solution(sequence, k) {
    let answer = [];
    let sumLen = sequence.length;
        
    let left = 0;
    let right = 0;
    let sum = sequence[0];
    
    while(left <= right) {
        if(sum === k) {
            if(sumLen > right - left) {
                answer = [left, right];
                sumLen = right - left;
            }
        }
        
        if(right + 1 < sequence.length && sum < k) {
            right += 1;
            sum += sequence[right];
            continue;
        }
        
        sum -= sequence[left];
        left += 1;
    }
    
    return answer;
}