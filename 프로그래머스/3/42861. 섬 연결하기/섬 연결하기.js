function solution(n, costs) {
    let answer = 0;
    let parent = new Array(n).fill((idx) => idx);
    
    for(let i = 0; i < parent.length; i++) {
        parent[i] = i;
    }
    
    const findParent = (node) => {
        if(node === parent[node]) return node;
        return parent[node] = findParent(parent[node]);
    }
    
    const unionParent = (a, b) => {
        a = findParent(a);
        b = findParent(b);
        
        if(a < b) parent[b] = a;
        else parent[a] = b;
    }

    costs.sort((a, b) => {
        return a[2] - b[2];
    })
    
    for(let i = 0; i < costs.length; i++) {
        let cost = costs[i][2];
        let a = costs[i][0];
        let b = costs[i][1];
        
        if(findParent(a) !== findParent(b)) {
            unionParent(a, b);
            answer += cost;
        }
    }
    
    return answer;
}