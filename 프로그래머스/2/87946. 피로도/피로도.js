// 순열 (i가 8이하의 배열)
function solution(k, dungeons) {
    let answer = 0;
    let visited = new Array(dungeons.length).fill(false);

    dungeons.forEach((v, i) => {
        v.unshift(i);
    })
        
    let selected = [];
    const dfs = (remainK) => {
        if(remainK <= 0) return;
        
        answer = Math.max(answer, selected.length);
        
        for(let i of dungeons) {
            if(visited[i[0]]) continue;
            
            if(remainK >= i[1] && remainK >= i[2]) {
                visited[i[0]] = true;
                selected.push(i[0])
                remainK -= i[2];
                dfs(remainK);
                
                visited[i[0]] = false;
                selected.pop();
                remainK += i[2];
            }
        }
    }
    
    dfs(k);
    
    return answer;
}