function solution(begin, target, words) {
    let answer = 987654321;
    
    // 타겟이 없는 경우
    if(!words.includes(target)) return 0;
    
    let visited = new Array(words.length).fill(false);
    
    const dfs = (idx, arr, visited) => {
        if(words[idx] === target) {
            answer = Math.min(arr.length, answer);
            return;
        }
        
        for(let i = 0; i < words.length; i++) {
            if(visited[i]) continue;
            let cnt = 0;
            
            for(let j = 0; j < words[i].length; j++) {
                if(words[i][j] !== words[idx][j]) cnt++;   
                if(cnt > 1) break;
            }
            
            if(cnt === 1) {
                arr.push(words[i]);
                visited[i] = true;
                dfs(i, arr, visited);
                arr.pop();
                visited[i] = false;
            }
        }
    }
    
    for(let i = 0; i < words.length; i++) {
        let cnt = 0;
        for(let j = 0; j < words[i].length; j++) {
            if(begin[j] !== words[i][j]) cnt++;   
            if(cnt > 1) break;
        }
        
        if(cnt === 1) {
            visited[i] = true;
            dfs(i, [words[i]], visited);
            visited[i] = false;
        }
    }
    
    return answer;
}