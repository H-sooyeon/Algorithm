function solution(begin, target, words) {
    let answer = 0;
    let visited = new Array(words.length).fill(false);
    
    const dfs = (word, depth, arr) => {
        if(word === target) {
            answer = depth;
            return;
        }
        
        for(let i = 0; i < words.length; i++) {
            if(visited[i]) continue;
            
            let last_word = arr[arr.length - 1];
            let cnt = 0;
            
            for(let j = 0; j < last_word.length; j++) {
                if(last_word[j] !== words[i][j]) cnt++;
                if(cnt > 1) break;
            }
            
            if(cnt <= 1) {
                arr.push(words[i]);
                visited[i] = true;
                dfs(words[i], depth + 1, arr);
                arr.pop();
                visited[i] = false;
            }
        }
    }
    
    dfs(begin, 0, [begin]);
    
    
    return answer;
}