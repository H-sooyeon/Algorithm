function solution(begin, target, words) {
    let answer = words.length + 1;
    
    if(!words.includes(target)) {
        return 0;
    }
    
    const dfs = (current, visited, depth) => {
        if(current === target) {
            answer = Math.min(depth, answer);
            return;
        }
        
        for(let i = 0; i < words.length; i++) {
            if(visited[i]) continue;
            
            let diff = 0;
            for(let j = 0; j < words[i].length; j++) {
                if(words[i][j] !== current[j]) diff += 1;
                
                if(diff > 1) {
                    break;
                }
            }
            
            if(diff === 1) {
                visited[i] = true;
                dfs(words[i], visited, depth + 1);
                visited[i] = false;
            }
        }
    }
    
    dfs(begin, new Array(words.length).fill(false), 0);
    
    return answer;
}