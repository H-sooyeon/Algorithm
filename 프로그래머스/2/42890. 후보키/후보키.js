function solution(relation) {
    const n = relation.length;
    const m = relation[0].length;
    const candidateKey = new Set();
    
    const isCandidateKey = (candidate) => {
        const tmp = new Set();
        const keys = candidate.map(Number);
        for(let i = 0; i < n; i++) {
            const value = [];
            for(let key of keys) {
                value.push(relation[i][key]);
            }
            
            tmp.add(value.join(','));
        }
        
        if(tmp.size === n) return true;
        return false;
    }
    
    const isMinimal = (list) => {
        for (let keyStr of candidateKey) {
            const keyArr = keyStr.split(',').map(Number);
            // key(이미 등록된 후보키)의 모든 원소가 list에 들어있는지 확인
            if (keyArr.every(v => list.includes(v))) return false;
        }
        return true;
    };
    
    const combination = (start, depth, list, visited) => {
        if(list.length === depth) {            
            // 후보키에 해당하는지 체크 및 추가
            if (isCandidateKey(list) && isMinimal(list)) {
                candidateKey.add(list.join(','));
            }
            return;
        }
        
        for(let i = start + 1; i < m; i++) {
            if(visited[i]) continue;
            
            list.push(i);
            visited[i] = true;
            combination(i, depth, list, visited);
            list.pop();
            visited[i] = false;
        }
    }
    
    for(let i = 1; i <= m; i++) {
        const visited = new Array(m).fill(false);
        combination(-1, i, [], visited);
    }
    
    // console.log(candidateKey)
    
    return candidateKey.size === 0 ? 1 : candidateKey.size;
}