function solution(n, computers) {
    let answer = 0;
    let visited = new Array(n + 1);
    let list = Array.from(Array(n + 1), () => []);
    
    for(let i = 0; i < computers.length; i++) {
        for(let j = 0; j < computers[i].length; j++) {
            if(i === j) continue;
            
            if(computers[i][j]) {
                list[i + 1].push(j + 1);
            }
        }
    }
        
    const dfs = (node) => {
        visited[node] = true;
        
        for(let link of list[node]) {
            if(!visited[link]) {
                dfs(link);
            }
        }
    }
    
    for(let i = 1; i <= n; i++) {
        if(!visited[i]) {
            answer++;
            dfs(i);
        }
    }
    
    return answer;
}