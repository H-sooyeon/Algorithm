// 행렬 곱셈 -> m * k, k * n의 값으로 들어온다.

function solution(arr1, arr2) {
    var answer = [[]];
    
    for(let i = 0; i < arr1.length; i++) {
        let a_row = [];
        
        for(let r = 0; r < arr2[0].length; r++) {
            let mul = 0;
            for(let j = 0; j < arr1[i].length; j++) {
                mul += (arr1[i][j] * arr2[j][r]);
            }
            a_row.push(mul);
        }
        
        answer.push(a_row);
    }
    
    // console.log(answer);
    answer.shift();
    
    return answer;
}