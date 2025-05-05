function solution(board, aloc, bloc) {
    let answer = -1;
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const n = board.length;
    const m = board[0].length;
    // dfs로 게임 진행 결과를 알아낸 후, 내가 지는 사람이라면 최적의 위치로 이동
    // 내가 이기는 사람이라면 갈 수 있는 곳 모두 이동
    
    const canMove = (y, x) => {
        if(y >= n || x >= m || y < 0 || x < 0) return false;
        if(board[y][x] === 0) return false;
        
        return true;
    }
    
    const isFinished = (y, x) => {
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            // 움직일 수 있다면 아직 끝난게 아니다
            if(canMove(ny, nx)) return false;
        }
        return true;
    }
    
    const dfs = (curPlayerLoc, nextPlayerLoc) => {
        const [cur_y, cur_x] = curPlayerLoc;
        const [next_y, next_x] = nextPlayerLoc;
        
        // 지금 끝났다면 현재 플레이어가 진 것
        if(isFinished(cur_y, cur_x)) {
            return { win: false, turn: 0 }
        }
        
        // 현재턴의 사람과 다음턴의 사람 위치가 같다면 현재턴 사람 승
        if(cur_y === next_y && cur_x === next_x) {
            return { win: true, turn: 1 }
        }
        
        let canWin = false;
        let minTurn = Infinity;
        let maxTurn = 0;
        
        // 이후의 게임에서의 결과를 확인
        for(let i = 0; i < 4; i++) {
            const ny = cur_y + dy[i];
            const nx = cur_x + dx[i];
            
            if(!canMove(ny, nx)) continue;
            
            board[cur_y][cur_x] = 0;
            // 다음 턴 사람에 대한 결과
            const { win, turn } = dfs(nextPlayerLoc, [ny, nx]);
            
            board[cur_y][cur_x] = 1;
            
            // 다음 턴 사람이 이기고 현재 턴 사람이 이길 수 없다면
            if(win && !canWin) {
                maxTurn = Math.max(maxTurn, turn);
            }
            else if(!win) {
                // 다음 턴 사람이 이길 수 없다면 현재 턴 사람이 최소한으로 끝냄
                canWin = true;
                minTurn = Math.min(minTurn, turn);
            }
        }
        
        return {
            win: canWin,
            turn: 1 + (canWin ? minTurn : maxTurn)
        }
    }
    
    answer = dfs(aloc, bloc);
    
    return answer.turn;
}