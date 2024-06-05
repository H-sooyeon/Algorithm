function solution(tickets) {
    let answer = [];
    let set = new Set();
    let arr = {};
    let visited = {};
    
    for(let i = 0; i < tickets.length; i++) {
        set.add(tickets[i][0]);
        set.add(tickets[i][1]);
        
        if(arr[tickets[i][0]]) {
            arr[tickets[i][0]].push(tickets[i][1]);
        }
        else {
            arr[tickets[i][0]] = [tickets[i][1]];
        }
    }
    
    const keys = Object.keys(arr);
    
    for(let s of set) {
        if(!keys.includes(s)) {
            arr[s] = [];
            keys.push(s);
        }
    }
    
    for(let i = 0; i < keys.length; i++) {
        visited[keys[i]] = new Array(arr[keys[i]].length).fill(false);
    }
    
    const dfs = (selected, start) => {
        if(selected.length === tickets.length + 1) {
            answer.push([...selected]);
            return;
        }
        
        for(let i = 0; i < arr[start].length; i++) {
            if(visited[start][i]) continue;
            
            selected.push(arr[start][i]);
            visited[start][i] = true;
            dfs(selected, arr[start][i]);
            selected.pop();
            visited[start][i] = false;
        }
    }
    
    dfs(['ICN'], 'ICN');
    
    if(answer.length === 1) return answer[0];
    
    answer.sort();
    
    return answer[0];
}