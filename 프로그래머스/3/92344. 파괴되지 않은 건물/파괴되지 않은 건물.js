function solution(board, skill) {
    let answer = 0;
    // type이 1일 경우 적의 공격
    // type이 2일 경우 아군의 회복 스킬
    const n = board.length;
    const m = board[0].length;
    const newBoard = Array.from({length: n + 1}, () => Array(m + 1).fill(0));
    
    skill.forEach((s) => {
        const [type, r1, c1, r2, c2, degree] = s;
        
        if(type === 1) {
            // 적의 공격
            newBoard[r1][c1] -= degree;
            newBoard[r1][c2 + 1] += degree;
            
            newBoard[r2 + 1][c1] += degree;
            newBoard[r2 + 1][c2 + 1] -= degree;
        }
        else if(type === 2) {
            // 아군의 회복
            newBoard[r1][c1] += degree;
            newBoard[r1][c2 + 1] -= degree;
            
            newBoard[r2 + 1][c1] -= degree;
            newBoard[r2 + 1][c2 + 1] += degree;
        }
    })
        
    // 가로 누적합
    for(let i = 0; i <= n; i++) {
        for(let j = 1; j <= m; j++) {
            newBoard[i][j] += newBoard[i][j-1];
        }
    }
        
    // 세로 누적합
    for(let j = 0; j < m; j++) {
        for(let i = 1; i <= n; i++) {
            newBoard[i][j] += newBoard[i-1][j];
        }
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            newBoard[i][j] += board[i][j];
            
            if(newBoard[i][j] > 0) {
                answer += 1;
            }
        }
    }
    
    return answer;
}