function solution(A,B){
    let answer = 0;

    /*
    * A를 오름차순으로 정렬, B를 내림차순으로 정렬
    * 순서대로 곱하면 작은 값 * 큰 값이 되므로 큰 값은 결과적으로 작은 값으로 만들어짐
    */
    
    A.sort((a, b) => a - b);
    B.sort((a, b) => b - a);
    
    for(let [idx, v] of A.entries()) {
        answer += v * B[idx];
    }

    return answer;
}