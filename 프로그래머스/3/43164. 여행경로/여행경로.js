function solution(tickets) {
    let answer = [];
    const requireVisitedCityCnt = tickets.length;
    const city = new Map();
    
    tickets.forEach((ticket, idx) => {
        const [start, arrive] = ticket;
        
        const list = city.get(start);
        if(list) {
            list.push([arrive, idx]);
            city.set(start, list);
        }
        else {
            city.set(start, [[arrive, idx]]);
        }
    })
        
    const dfs = (current, depth, list, visited) => {
        if(depth === requireVisitedCityCnt) {
            if(answer.length === 0) {
                answer = [...list];
            }
            else {
                for(let i = 0; i < list.length; i++) {
                    if(answer[i] === list[i]) continue;
                    let tmp = [answer[i], list[i]];
                    
                    tmp.sort((a, b) => a.localeCompare(b));
                    if(tmp[0] === list[i]) {
                        answer = [...list];
                        break;
                    }
                    else break;
                }
            }
            return;
        }
        
        if(!city.get(current)) return;
        
        for(let [next, idx] of city.get(current)) {
            if(visited[idx]) continue;
            
            list.push(next);
            visited[idx] = true;
            dfs(next, depth + 1, list, visited);
            list.pop();
            visited[idx] = false;
        }
    }
    
    dfs('ICN', 0, ['ICN'], new Array(tickets.length).fill(false));
    
    return answer;
}