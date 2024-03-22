function solution(n, left, right) {
    let startLine = Math.floor(left / n);
    let endLine = Math.floor(right / n);
    let arr = Array.from(Array(endLine - startLine + 1), () => Array(n).fill(0));
    
    for(let i = 0; i <= endLine - startLine; i++) {
        for(let j = 0; j < n; j++) {
            arr[i][j] = Math.max(startLine + i + 1, j + 1);
        }
    }
    
    let answer = arr.flat().slice(left - startLine * n, right - startLine * n + 1);
    
    return answer;
}