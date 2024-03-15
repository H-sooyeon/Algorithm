function solution(m, n, board) {
    let answer = 0;
    board = board.map((row) => Array.from(row));
    
    while(true) {
        let find = [];
        // 현재 위치 기준 앞, 뒤, 위, 아래에 자신과 같은 문자가 존재하는지 체크
        for(let i = 0; i < m - 1; i++) {
            for(let j = 0; j < n - 1; j++) {
                let cur = board[i][j];
            
                if(cur && 
                cur === board[i][j+1] && 
                cur === board[i+1][j] && 
                cur === board[i+1][j+1]) {
                    find.push([i, j]);
                }
            }
        }
        
        if(find.length) {
            let set = new Set();
            find.forEach(([y, x]) => {
                board[y][x] = 0;
                board[y+1][x] = 0;
                board[y][x+1] = 0;
                board[y+1][x+1] = 0;
                
                set.add(JSON.stringify([y, x]));
                set.add(JSON.stringify([y+1, x]));
                set.add(JSON.stringify([y, x+1]));
                set.add(JSON.stringify([y+1, x+1]));
            })
            
            answer += set.size;
        } else break;
        
        for(let y = m-1; y >= 0; y--) {
            for(let x = 0; x < n; x++) {
                // 0이 아닌 것 찾기
                for(let i = y-1; i >= 0; i--) {
                    if(board[y][x]) break;
                    
                    if(board[i][x]) {
                        board[y][x] = board[i][x];
                        board[i][x] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    
    return answer;
}