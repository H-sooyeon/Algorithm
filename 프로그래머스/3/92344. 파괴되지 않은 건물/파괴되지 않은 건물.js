function solution(board, skill) {
    let answer = 0;
    let n = board.length;
    let m = board[0].length;
    let durability = Array.from({length: n + 1}, () => Array(m + 1).fill(0));
    
    skill.forEach((e) => {
        const [type, r1, c1, r2, c2, degree] = e;
        
        if(type === 1) {
            durability[r1][c1] -= degree;
            durability[r2 + 1][c2 + 1] -= degree;
        
            durability[r1][c2 + 1] += degree;
            durability[r2 + 1][c1] += degree;
        } 
        else if(type === 2) {
            durability[r1][c1] += degree;
            durability[r2 + 1][c2 + 1] += degree;
        
            durability[r1][c2 + 1] -= degree;
            durability[r2 + 1][c1] -= degree;
        }
    })
        
    // 상하로 누적합
    for(let j = 0; j < m + 1; j++) {
        for(let i = 1; i < n + 1; i++) {
            durability[i][j] += durability[i-1][j];
        }
    }
        
    // 좌우로 누적합
    for(let i = 0; i < n + 1; i++) {
        for(let j = 1; j < m + 1; j++) {
            durability[i][j] += durability[i][j-1];
        }
    }
        
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            board[i][j] += durability[i][j];
            if(board[i][j] > 0) answer++;
        }
    }
        
    return answer;
}