function solution(n, computers) {
    const parents = new Array(computers.length);
    
    for(let i = 0; i < n; i++) {
        parents[i] = i;
    }
    
    const findParent = (x) => {
        if(x === parents[x]) return x;
        return parents[x] = findParent(parents[x]);
    }
    
    const unionParents = (a, b) => {
        const parentA = findParent(a);
        const parentB = findParent(b);
        
        if(parentA < parentB) parents[parentB] = parentA;
        else parents[parentA] = parentB;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(i === j) continue;
            
            if(computers[i][j] === 1 && findParent(i) !== findParent(j)) {
                unionParents(i, j);
            }
        }
    }
    
    for(let i = 0; i < n; i++) {
        parents[i] = findParent(i);
    }
        
    return new Set(parents).size;
}