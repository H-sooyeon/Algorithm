function solution(m, n, board) {
    let answer = 0;
    board = board.map((row) => Array.from(row));
        
    while(true) {
        let popList = [];
        // 지울 블록 찾기
        for(let i = 0; i < board.length - 1; i++) {
            for(let j = 0; j < board[i].length - 1; j++) {
                if(board[i][j] === 0) continue;
                if(board[i][j] === board[i][j+1] &&
                board[i][j] === board[i+1][j] &&
                board[i][j] === board[i+1][j+1]) {
                    popList.push([i, j]);
                }
            }
        }
        
        // 지울 블록이 없으면 break
        if(popList.length === 0) break;
        
        // 지우기
        let set = new Set();
        for(let [y, x] of popList) {
            board[y][x] = 0;
            board[y][x+1] = 0;
            board[y+1][x] = 0;
            board[y+1][x+1] = 0;
            
            // 지워야 하는 블록 set으로 중복 제거
            set.add(JSON.stringify([y, x]));
            set.add(JSON.stringify([y, x+1]));
            set.add(JSON.stringify([y+1, x]));
            set.add(JSON.stringify([y+1, x+1]));
        }
        
        answer += set.size;
        
        // 블록 내리기
        for(let i = board.length-1; i >= 0; i--) {
            for(let j = 0; j < board.length; j++) {
                // 내려야 하는 경우가 아니면 continue
                if(board[i][j] !== 0) continue;
                
                // 위에서 내릴 수 있는 블록이 있으면 가져오기
                for(let k = i - 1; k >= 0; k--) {
                    if(board[k][j] !== 0) {
                        board[i][j] = board[k][j];
                        board[k][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    return answer;
}