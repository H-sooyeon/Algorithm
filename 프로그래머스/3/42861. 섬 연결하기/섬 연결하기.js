function solution(n, costs) {
    let answer = 0;
    const parents = new Array(n);
    const copy = costs.map((cost) => [...cost]);
    
    copy.sort((a, b) => a[2] - b[2]);
    
    for(let i = 0; i < n; i++) {
        parents[i] = i;
    }
        
    const findParents = (x) => {
        const parent = parents[x];
        
        if(parent !== x) return parents[x] = findParents(parent);
        return x;
    }
    
    const unionParents = (a, b) => {
        const aP = findParents(a);
        const bP = findParents(b);
        
        if(aP > bP) {
            parents[aP] = bP;
        }
        else if(aP < bP) {
            parents[bP] = aP;
        }
    }
    
    copy.forEach((path) => {
        const [a, b, cost] = path;
        
        if(findParents(a) !== findParents(b)) {
            answer += cost; // 비용 순으로 오름차순 정렬했기 때문에 최소 비용으로 더해짐
            unionParents(a, b);
        }
    })
    
    return answer;
}