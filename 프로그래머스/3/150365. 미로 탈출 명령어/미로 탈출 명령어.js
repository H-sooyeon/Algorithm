function solution(n, m, x, y, r, c, k) {
    let answer = 'impossible';
    let dx = [1, 0, 0, -1];
    let dy = [0, -1, 1, 0];
    let search = ['d', 'l', 'r', 'u'];
    
    const dfs = (x, y, cnt, path) => {
        // 맨헤튼 거리로 남은 횟수 안에 도착지까지 갈 수 없는 경우 stop
        if(k < cnt + Math.abs(x - r) + Math.abs(y - c)) {
            return;
        }
        
        // 정답을 찾을 경우
        if(cnt === k && x === r && y === c) {
            console.log(path);
            answer = path;
            return;
        }
        
        for(let i = 0; i < 4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            
            if(ny > m || ny <= 0 || nx > n || nx <= 0) continue;
            if(answer !== 'impossible') return;
            
            dfs(nx, ny, cnt + 1, path + search[i]);
        }
    }
    
    const min_move = Math.abs(r - x) + Math.abs(c - y);
    if(min_move > k || (k - min_move) % 2 === 1) return 'impossible';
    
    dfs(x, y, 0, '');
    
    return answer;
}