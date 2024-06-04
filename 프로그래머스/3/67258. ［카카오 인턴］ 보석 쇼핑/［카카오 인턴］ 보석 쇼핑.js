function solution(gems) {
    let answer = [1, gems.length];
    const gemCnt = new Set(gems).size;

    const map = new Map();
    map.set(gems[0], 1);
    
    let l = 0, r = 0;
    while(r < gems.length) {
        if(gemCnt === map.size) {
            if(r - l < answer[1] - answer[0]) {
                answer = [l + 1, r + 1];
            }
            map.set(gems[l], map.get(gems[l]) - 1);
            if(map.get(gems[l]) === 0) {
                map.delete(gems[l]);
            }
            l++;
        }
        else {
            r++;
            const right = map.get(gems[r]);
            map.set(gems[r], right ? right + 1 : 1);
        }
    }
    
    return answer;
}