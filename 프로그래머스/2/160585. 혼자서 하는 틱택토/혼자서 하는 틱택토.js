// 규칙을 지켜서 나올 수 있는 게임 상황 1, 아니라면 0
// 누군가가 이긴 상황인가?
// 누군가의 표시가 더 많지는 않은가? (+- 1)
// 선공은 O, 후공은 X
function solution(board) {
    let answer = 1;

    // 선공과 후공의 개수 세기
    let first = 0;
    let second = 0;
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === 'O') first += 1;
            else if(board[i][j] === 'X') second += 1;
        }
    }
        
    // 개수 차이에 의한 규칙 어긋남
    if(first + 1 <= second) return 0;
    if(first > second + 1) return 0;
    
    // 선/후공이 이긴 경우 확인
    // 가로 확인
    let firstWin = false;
    let secondWin = false;
    for(let row = 0; row < 3; row++) {
        if(board[row][0] === board[row][1] && board[row][2] === board[row][0]) {
            if(board[row][0] === 'O') firstWin = true;
            else if(board[row][0] === 'X') secondWin = true;
        }
    }
    
    // 세로 확인
    for(let col = 0; col < 3; col++) {
        if(board[0][col] === board[1][col] && board[2][col] === board[0][col]) {
            if(board[0][col] === 'O') firstWin = true;
            else if(board[0][col] === 'X') secondWin = true;
        }
    }
    
    // 대각선 확인
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        if(board[0][0] === 'O') firstWin = true;
        else if(board[0][0] === 'X') secondWin = true;
    }
    if(board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        if(board[0][2] === 'O') firstWin = true;
        else if(board[0][2] === 'X') secondWin = true;
    }
    
    if(firstWin && first !== second + 1) return 0;
    if(secondWin && first !== second) return 0;
    
    return answer;
}