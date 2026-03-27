function solution(maps) {
    let answer = [];
    const n = maps.length;
    const m = maps[0].length;
    
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    
    const map = maps.map((row) => row.split('').map((value) => {
        if(Number(value)) return Number(value);
        return value;
    }));
    const visited = Array.from({length: n}, () => new Array(m).fill(false));
    
    const dfs = (y, x) => {
        visited[y][x] = true;
        
        let value = 0;
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
            if(visited[ny][nx] || map[ny][nx] === 'X') continue;
            
            value += dfs(ny, nx);
        }
        
        return map[y][x] + value;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(visited[i][j] || map[i][j] === 'X') continue;
            
            answer.push(dfs(i, j));
        }
    }
    
    if(answer.length === 0) return [-1];
    return answer.sort((a, b) => a - b);
}