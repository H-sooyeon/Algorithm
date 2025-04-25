function solution(n, lighthouse) {
    let answer = 0;
    const tree = Array.from({length: n + 1}, () => Array());
    const lights = new Array(n + 1).fill(false);
    const visited = new Array(n + 1).fill(false);
    
    lighthouse.forEach(([a, b]) => {
        tree[a].push(b);
        tree[b].push(a);
    })
    
    const queue = [[1, 1]];
    while(queue.length) {
        const [node, parent] = queue.pop();
        
        if(visited[node]) {
            if(node === parent) continue;
            
            if(!lights[node] && !lights[parent]) {
                // 자신과 부모가 모두 불이 꺼져있다면 부모의 불을 킨다.
                lights[parent] = true;
                answer += 1;
            }
            continue;
        }
        
        visited[node] = true;
        queue.push([node, parent]);
        
        for(const next of tree[node]) {
            if(!visited[next]) {
                queue.push([next, node]);
            }
        }
    }
     
    return answer;
}