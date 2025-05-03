function solution(n, m, x, y, r, c, k) {
    let answer = '';
    // 사전 순으로 빠른 경로 순서 -> d, l, r, u
    const dx = [1, 0, 0, -1];
    const dy = [0, -1, 1, 0];
    const pathSequence = ['d', 'l', 'r', 'u'];
    
    const remainDist = (x, y, path) => {
        return Math.abs(r - x) + Math.abs(c - y) + path.length;
    }
    
    // 장애물이 없는 경로 탐색은 멘헤튼 거리로 탐색하면 된다.
    let minDist = remainDist(x, y, '');
    if(minDist > k) return 'impossible';
    if((k - minDist) % 2 !== 0) return 'impossible';
    
    const dfs = (path, x, y) => {
        const remain = remainDist(x, y, path);
        if(remain > k || (k - remain) % 2 !== 0 || answer !== '') return;
        
        if(x === r && y === c && k === path.length) {
            answer = path;
            return;
        }
        
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            if(ny > m || nx > n || ny < 1 || nx < 1) continue;
            dfs(path + pathSequence[i], nx, ny);
        }
    }
    
    dfs('', x, y);

    if(answer) return answer;
    return 'impossible';
}