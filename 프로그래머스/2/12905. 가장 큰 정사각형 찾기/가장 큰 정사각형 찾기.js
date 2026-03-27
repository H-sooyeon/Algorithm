function solution(board) {
    let answer = 0;
    const n = board.length;
    const m = board[0].length;
    
    if(n < 2 || m < 2) {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                if(board[i][j] === 1) return 1;
            }
        }
        return 0;
    }
    
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            if(board[i][j] === 1) {
                board[i][j] = Math.min(
                    board[i-1][j],
                    board[i-1][j-1],
                    board[i][j-1],
                ) + 1;
                
                answer = Math.max(answer, board[i][j]);
            }
        }
    }
    
    return answer * answer;
}