function solution(begin, target, words) {
    if(!words.includes(target)) return 0;
    
    let answer = words.length;
    const visited = new Array(words.length).fill(false);
    
    const ifDifferByOne = (w1, w2) => {
        let diff = 0;
        for(let i = 0; i < w1.length; i++) {
            if(w1[i] !== w2[i]) diff += 1;
            
            if(diff > 1) return false;
        }
        return true;
    }
    
    const dfs = (word, visited, cnt) => {
        if(word === target) {
            answer = Math.min(cnt, answer);
            return;
        }
                
        for(let i = 0; i < words.length; i++) {
            if(visited[i]) continue;
            
            if(ifDifferByOne(word, words[i])) {
                visited[i] = true;
                dfs(words[i], visited, cnt + 1);
                visited[i] = false;
            }
        }
    }
    
    dfs(begin, visited, 0);
    
    return answer;
}