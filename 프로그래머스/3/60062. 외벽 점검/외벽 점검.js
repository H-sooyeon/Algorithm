function solution(n, weak, dist) {
    let answer = Infinity;
    const doubleWeak = [...weak];
    const permutation = [];
    const visited = new Array(dist.length).fill(false);
    
    weak.forEach((pos) => doubleWeak.push(n + pos));
    
    const Permutation = (v) => {
        if(v.length === dist.length) {
            permutation.push([...v]);
            return;
        }
        
        for(let i = 0; i < dist.length; i++) {
            if(visited[i]) continue;
            
            v.push(i);
            visited[i] = true;
            Permutation(v);
            v.pop();
            visited[i] = false;
        }
    }
    
    Permutation([]);
    
    permutation.forEach((list) => {
        for(let t = 0; t < weak.length; t++) {
            let save = [list[0]];
            let weakPos = t;
            let findWeakCnt = 0;
            let friendIdx = 0;
            let canMoveSum = dist[list[0]] + doubleWeak[t];
            
            while(friendIdx < dist.length && weakPos < doubleWeak.length) {
                if(findWeakCnt === weak.length) {
                    answer = Math.min(answer, save.length);
                    break;
                }
                
                if(canMoveSum < doubleWeak[weakPos]) {
                    friendIdx += 1;
                    canMoveSum = doubleWeak[weakPos] + dist[list[friendIdx]];
                    save.push(friendIdx);
                }
                
                weakPos += 1;
                findWeakCnt += 1;
            }
        }
    })
    
    if(answer === Infinity) return -1;
    return answer;
}