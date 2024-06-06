function solution(board) {
    let answer = 0;
    const n = board.length;
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    const dp = Array.from(Array(n), () => Array.from(Array(n), () => Array(4).fill(1e9)));
    
    // y, x, cost, dir
    // 처음엔 아래로/오른쪽 이동만 있음
    const queue = [[0, 0, 0, 0], [0, 0, 0, 1]];
    
    while(queue.length) {
        let [y, x, cost, dir] = queue.shift();
        
        for(let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= n || nx < 0) continue;
            if(board[ny][nx]) continue;
            
            let new_cost = cost + 100;
            if(dir !== i) {
                new_cost += 500;
            }
            
            // console.log(ny,nx, new_cost, i)
            // 기존에 저장되어 있던 값보다 작다면 바꾸기
            if(new_cost < dp[ny][nx][i]) {
                dp[ny][nx][i] = new_cost;
                queue.push([ny, nx, new_cost, i]);
            }
        }
    }
    
    answer = Math.min(...dp[n-1][n-1]);
    
    return answer;
}