function solution(n, costs) {
    let answer = 0;
    const parents = new Array(n);
    
    for(let i = 0; i < n; i++) {
        parents[i] = i;
    }
    
    const findParent = (x) => {
        if(parents[x] === x) return x;
        return parents[x] = findParent(parents[x]);
    }
    
    const unionParent = (a, b) => {
        const parentA = findParent(a);
        const parentB = findParent(b);
        
        if(parentA < parentB) parents[parentB] = parentA;
        else parents[parentA] = parentB;
    }
    
    costs = costs.sort((a, b) => {
        return a[2] - b[2];
    })
    
    for(let cost of costs) {
        const [a, b, w] = cost;
        
        if(findParent(a) !== findParent(b)) {
            unionParent(a, b);
            answer += w;
        }
    }
    
    return answer;
}