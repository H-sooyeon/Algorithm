function solution(n) {
    // 퀸은 가로/세로/대각선으로 이동할 수 있다.
    // 한 열에 하나의 퀸
    // 한 행에 하나의 퀸
    // 백트래킹으로 가능한 위치에 퀸을 놓고 최종 퀸의 개수 찾기
    let answer = 0;
    
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false); // /방향
    const diag2 = new Array(2 * n - 1).fill(false); // \방향
    
    const findQueen = (row) => {
        if(row >= n) {
            answer += 1;
            return;
        }
        
        for(let col = 0; col < n; col += 1) {
            if(cols[col] || diag1[row + col] || diag2[row - col + n - 1]) {
                continue;
            }
            
            cols[col] = diag1[row + col] = diag2[row - col + n - 1] = true;
            findQueen(row + 1);
            cols[col] = diag1[row + col] = diag2[row - col + n - 1] = false;
        }
    }
    
    findQueen(0);
    
    return answer;
}