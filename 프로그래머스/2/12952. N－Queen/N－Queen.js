// 백트래킹
// 해당 체스판 위치에 퀸을 놓을 수 있는지 없는지 체크
// 놓은 퀸의 개수가 n개일 경우 cnt++

function solution(n) {
    let answer = 0;
    let queens = [];
    
    const isPossible = (row, col) => {
        let check = true;
        
        for(let queen of queens) {
            if(queen[0] === row || queen[1] === col) check = false;
            if(Math.abs(queen[0] - row) - Math.abs(queen[1] - col) === 0) 
                check = false;
        }
        
        return check;
    }
    
    // 놓은 퀸의 개수, y, x 위치
    const dfs = (row) => {
        if(row === n) {
            answer++;
            return;
        }
        
        for(let i = 0; i < n; i++) {
            if(isPossible(row, i)) {
                queens.push([row, i]);
                dfs(row + 1);
                queens.pop();    
            }
        }
    }
    
    dfs(0);
    
    
    return answer;
}