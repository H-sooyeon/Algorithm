function solution(a, edges) {
    if (a.reduce((a, b) => a + b) !== 0) return -1
    
    let answer = BigInt(0);
    let copy = a.slice();
    let tree = Array.from({length: a.length}, () => []);
    let visited = new Array(a.length).fill(false);
    
    edges.forEach(([e1, e2]) => {
        tree[e1].push(e2);
        tree[e2].push(e1);
    })
    
    let stack = [[0, null]];
    
    while(stack.length) {
        const [node, parent] = stack.pop();
        
        if(visited[node]) {
            answer += BigInt(Math.abs(copy[node]));
            copy[parent] += copy[node];
            copy[node] = 0;
            
            continue;
        }        
    
        stack.push([node, parent]);
        visited[node] = true;
        
        for(let next of tree[node]) {
            if(!visited[next]) {
                stack.push([next, node]);
            }
        }
    }
    
    let result = BigInt(copy[0]);
    for(let i = 1; i < copy.length; i++) {
        if(copy[i]) {
            answer += BigInt(Math.abs(copy[i]));
            result += BigInt(copy[i]);
        }
    }
    
    if(result) {
        return -1;
    }
    
    return answer;
}