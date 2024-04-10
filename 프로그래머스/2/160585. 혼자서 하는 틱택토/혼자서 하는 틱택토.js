function solution(board) {
    let o_cnt = 0;
    let o_row = false;
    
    let x_cnt = 0;
    let x_row = false;
    
    board.forEach((r) => {
        let o_row_cnt = 0;
        let x_row_cnt = 0;
        
        for(let i = 0; i < r.length; i++) {
            if(r[i] === 'O') {
                o_cnt++;
                o_row_cnt++;
            }
            else if(r[i] === 'X') {
                x_cnt++;
                x_row_cnt++;
            }
        }
        
        if(!o_row && o_row_cnt > 2) o_row = true;
        if(!x_row && x_row_cnt > 2) x_row = true;
    })
    
    // 어느 한 쪽을 더 많이 둔 경우 확인, 선공 확인
    if(Math.abs(o_cnt - x_cnt) > 1 || o_cnt < x_cnt) return 0;
    
    let flag_o = false;
    let flag_x = false;
    // 빙고 확인은 O or X가 3개 이상일 때만
    if(o_row) flag_o = true;
    if(x_row) flag_x = true;
    
    if(o_cnt > 2 || x_cnt > 2) {
        // 세로 빙고 확인
        for(let i = 0; i < 3; i++) {
            let o_col_cnt = 0;
            let x_col_cnt = 0;
            
            for(let j = 0; j < 3; j++) {
                if(board[j][i] === 'O') o_col_cnt++;
                if(board[j][i] === 'X') x_col_cnt++;
            }
            
            if(o_col_cnt > 2) flag_o = true;
            if(x_col_cnt > 2) flag_x = true;
        }
        
        // 대각선 빙고 확인
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if(board[0][0] === 'O') flag_o = true;
            if(board[0][0] === 'X') flag_x = true;
        }
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if(board[0][2] === 'O') flag_o = true;
            if(board[0][2] === 'X') flag_x = true;
        }
    }
    
    // 게임 종료 확인
    if(o_cnt + x_cnt === 9) {
        if(flag_o && !flag_x && x_cnt + 1 === o_cnt) return 1;
        return 0;
    }
    
    if(flag_x && !flag_o && x_cnt === o_cnt) return 1;
    if(flag_o && !flag_x && x_cnt + 1 === o_cnt) return 1;
    if(flag_x || flag_o) return 0;
        
    return 1;
}