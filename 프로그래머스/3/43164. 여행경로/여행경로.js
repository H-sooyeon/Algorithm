// 항상 ICN 공항에서 출발
function solution(tickets) {
    let answer = [];
    const unique = new Set();
    const map = new Map();
    const visited = new Map();
    
    for(let ticket of tickets) {
        const [start, end] = ticket;
        unique.add(start);
        unique.add(end);
        
        if(!map.has(start)) {
            map.set(start, []);
            visited.set(start, []);
        }
        map.get(start).push(end);
        visited.get(start).push(false);
    }
    
    const dfs = (cur, visited, list) => {
        if(list.length - 1 === tickets.length) {
            const tmp = new Set(list);
            if(tmp.size === unique.size) {
                // 모든 도시를 방문했음
                answer.push(list.join(','));
            }
            return;
        }
        
        const nextList = map.get(cur);
        const nextVisited = visited.get(cur);
        
        if(!nextList) return;
        
        for(let i = 0; i < nextList.length; i++) {
            if(nextVisited[i]) continue;
            
            nextVisited[i] = true;
            list.push(nextList[i]);
            dfs(nextList[i], visited, list);
            list.pop();
            nextVisited[i] = false;
        }
    }
    
    dfs('ICN', visited, ['ICN']);
    
    return answer.sort()[0].split(',');
}