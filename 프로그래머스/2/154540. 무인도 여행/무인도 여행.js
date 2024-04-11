function solution(maps) {
    let answer = [];
    let n = maps.length;
    let m = maps[0].length;
    
    maps = maps.map((v, idx) => [...v]);
    
    let dy = [-1, 0, 1, 0];
    let dx = [0, 1, 0, -1];
    
    let visited = Array.from({length: maps.length}, (_, idx) => Array(maps[0].length).fill(false));
    let value = 0;
    
    const dfs = (y, x, cnt) => {
        visited[y][x] = true;
        value += Number(maps[y][x]);
        
        for(let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            
            if(ny >= n || ny < 0 || nx >= m || nx < 0) continue;
            if(visited[ny][nx] || maps[ny][nx] === 'X') continue;
            
            dfs(ny, nx);
        }
        return;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(maps[i][j] !== 'X' && !visited[i][j]) {
                value = 0;
                dfs(i, j);
                
                answer.push(value);
            }
        }
    }
    
    answer.sort((a, b) => a - b);
    if(!answer.length) return [-1];
    
    return answer;
}