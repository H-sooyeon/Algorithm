function solution(info, edges) {
    let answer = 0;
    let tree = Array.from({length: info.length}, () => []);
    
    for(let edge of edges) {
        const [parent, child] = edge;
        
        tree[parent].push(child);
    }
    
    const dfs = (node, possible, sheep, wolf) => {
        if(sheep <= wolf) return;
        answer = Math.max(sheep, answer);
        
        // 접근할 수 있는 노드들을 리스트화한다.
        let possibleNode = [...possible, ...tree[node]];
        
        // 현재 노드는 이미 방문했으므로 제거
        const idx = possibleNode.findIndex((v) => v === node);
        possibleNode.splice(idx, 1);
        
        for(let access of possibleNode) {
            if(info[access]) {
                // 늑대
                dfs(access, possibleNode, sheep, wolf + 1);
            } else {
                // 양
                dfs(access, possibleNode, sheep + 1, wolf);
            }
        }
    }
    
    dfs(0, [0], 1, 0);
    
    return answer;
}