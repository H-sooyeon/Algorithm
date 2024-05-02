function solution(data, col, row_begin, row_end) {
    let answer = 0;
    // col을 기준으로 오름차순 정렬
    // S_i = i번째 행의 튜플에 대해 각 컬럼의 값을 i로 나눈 나머지들의 합
    // i는 row_begin <= i <= row_end
    
    data.sort((a, b) => {
        if(a[col-1] === b[col-1]) {
            return b[0] - a[0];
        }
        else return a[col-1] - b[col-1];
    });
    
    let sum = [];
    for(let i = row_begin-1; i < row_end; i++) {
        let value = data[i].reduce((acc, cur) => acc + cur % (i + 1), 0)
        sum.push(value);
    }
    
    // console.log(sum);
    // console.log(data);
    
    answer = sum[0];
    for(let i = 0; i < sum.length - 1; i++) {
        answer = answer ^ sum[i + 1];
    }
    
    return answer;
}