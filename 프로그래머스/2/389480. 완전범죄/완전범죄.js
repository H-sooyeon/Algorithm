function solution(info, n, m) {
    let answer = Number.MAX_SAFE_INTEGER;
    const visited = new Set();
    
    const dfs = (depth, a, b) => {
        if(depth === info.length) {
            answer = Math.min(answer, a);
            return;
        }
        
        const key = `${depth}-${a}-${b}`;
        
        if(visited.has(key)) return;
        visited.add(key);
        
        let newA = a + info[depth][0];
        let newB = b + info[depth][1];
        
        if(newA < n && newA < answer) {
            dfs(depth + 1, newA, b);
        }
        
        if(newB < m) {
            dfs(depth + 1, a, newB);
        }
    }
    
    dfs(0, 0, 0);
    
    if(answer === Number.MAX_SAFE_INTEGER) {
        return -1;
    }
    
    
    return answer;
}