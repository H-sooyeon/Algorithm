// 모은 양의 수보다 늑대 수가 같거나 더 많아지면 모든 양을 잡아먹는다.
function solution(info, edges) { // 양 또는 늑대에 대한 배열, 연결 관계
    let answer = 1;
    const tree = Array.from({length: info.length}, () => Array());
    
    edges.forEach((edge) => {
        const [parent, child] = edge;
        tree[parent].push(child);
    })
    
    const dfs = (wolf, sheep, node, searchNode) => {
        if(wolf >= sheep) return;
        
        answer = Math.max(sheep, answer);
        
        const newSearchNode = searchNode.filter((el) => el !== node);
        for(let next of tree[node]) {
            newSearchNode.push(next);
        }
        
        for(let next of newSearchNode) {
            if(info[next] === 0) {
                dfs(wolf, sheep + 1, next, newSearchNode);
            }
            else {
                dfs(wolf + 1, sheep, next, newSearchNode);
            }
        }
    }
    
    dfs(0, 1, 0, [0]);
    
    return answer;
}