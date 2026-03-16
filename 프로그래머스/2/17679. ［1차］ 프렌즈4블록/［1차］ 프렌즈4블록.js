function solution(m, n, board) {
    let answer = 0;
    const deleteBlocks = new Set();
    board = board.map((row) => row.split(''));
        
    // 2x2 삭제할 블록이 없을 때까지 반복
    while(true) {
        deleteBlocks.clear();
        // 삭제 가능한 블록이 있는지 탐색
        for(let row = 0; row < m - 1; row++) {
            for(let col = 0; col < n - 1; col++) {
                const char = board[row][col];
                if (char === '.') continue;

                // 2x2 체크: 현재 위치에서 오른쪽, 아래, 대각선 확인
                if (board[row][col + 1] === char &&
                    board[row + 1][col] === char &&
                    board[row + 1][col + 1] === char) {
                    
                    deleteBlocks.add(`${row},${col}`);
                    deleteBlocks.add(`${row},${col + 1}`);
                    deleteBlocks.add(`${row + 1},${col}`);
                    deleteBlocks.add(`${row + 1},${col + 1}`);
                }
            }
        }
        
        if(deleteBlocks.size === 0) break;
        answer += deleteBlocks.size;
        
        // 블록 삭제
        for(let block of deleteBlocks) {
            const [y, x] = block.split(',').map(Number);
            board[y][x] = '.';
        }
        
        // 블록 내리기
        for(let col = 0; col < n; col++) {
            let stack = [];
            for(let row = m - 1; row >= 0; row--) {
                if(board[row][col] !== '.') {
                    stack.push(board[row][col]);
                    board[row][col] = '.';
                }
            }
            
            // 아래에서부터 채워넣기
            let currRow = m - 1;
            while(stack.length) {
                board[currRow][col] = stack.shift();
                currRow--;
            }
        }
    }
    
    return answer;
}