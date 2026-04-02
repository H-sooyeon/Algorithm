function solution(n, q, ans) {
    let answer = 0;
    const result = [];
    const visited = new Array(n + 1).fill(false);
    
    const combination = (start, list, visited) => {
        if(list.length === 5) {
            result.push([...list]);
            return;
        }
        
        for(let i = start + 1; i <= n; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            list.push(i);
            combination(i, list, visited);
            visited[i] = false;
            list.pop();
        }
    }
    
    combination(0, [], visited);
    
    for(let list of result) {
        const tmp = new Array(n + 1).fill(false);
        for(let value of list) tmp[value] = true;
        
        let outterCnt = 0;
        for(let i = 0; i < q.length; i++) {
            let innerCnt = 0;
            
            for(let value of q[i]) {
                if(tmp[value]) innerCnt += 1;
            }
            
            if(innerCnt === ans[i]) outterCnt += 1;
        }
        
        if(outterCnt === q.length) answer += 1;
    }
    
    
    return answer;
}