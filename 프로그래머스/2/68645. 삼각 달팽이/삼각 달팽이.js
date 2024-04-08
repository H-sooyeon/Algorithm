function solution(n) {
    let answer = [];
    let arr = Array.from({length: n}, (_, idx) => new Array(idx + 1).fill(0));
    
    let row_last = n;
    let row_start = 0;
    let col_last = n;
    let col_start = 0;
    
    let num = 1;
    while(true) {
        // 아래로 내려가기
        for(let i = row_start; i < row_last; i++) {
            arr[i][col_start] = num++;
        }
        row_start++; // 1
        col_start++; // 1
        
        // 오른쪽으로 이동하기
        for(let i = col_start; i < col_last; i++) {
            arr[row_last-1][i] = num++;
        }
        col_last--; // 4
        row_last--; // n - 1 = 4
        
        // 위로 올라가기
        // console.log('col_last: ', col_last - 1, ' row_last: ', row_last, ' row_start: ', row_start);
        let tmp = col_last - 1;
        for(let i = row_last-1; i >= row_start; i--) {
            arr[i][tmp--] = num++;
        }
        // console.log('row_start', row_start, ' col_start', col_start, ' row_last', row_last, ' col_last', col_last);
        // console.log(arr);

        col_last--; // 3
        row_start++;
        
        // console.log(col_start, col_last, row_start, row_last);
        if(col_last <= col_start || row_last <= row_start) break;
    }
    
    // console.log(arr);
    arr.forEach((v) => {
        answer.push(...v);
    })
    
    return answer;
}