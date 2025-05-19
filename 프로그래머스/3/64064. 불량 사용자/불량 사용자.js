function solution(user_id, banned_id) {
    const bannedIdLen = banned_id.length;
    const bannedUserById = Array.from({length: bannedIdLen}, () => Array());
    
    // banned_id에 맞는 유저 리스트 찾기
    for(let i = 0; i < user_id.length; i++) {
        for(let j = 0; j < bannedIdLen; j++) {
            if(user_id[i].length !== banned_id[j].length) continue;
            
            let isSame = true;
            for(let k = 0; k < banned_id[j].length; k++) {
                if(user_id[i][k] !== banned_id[j][k] && banned_id[j][k] !== '*') {
                    isSame = false;
                    break;
                }
            }
            
            if(isSame) {
                bannedUserById[j].push(user_id[i]);
            }
        }
    }
    
    // bannedUserById 조합 찾기 (유니크)
    const combinationArr = new Set();
    const combination = (v, depth) => {
        if(v.length === bannedIdLen) {
            const set = new Set(v);
            if(set.size === bannedIdLen) {
                const copy = v.slice();
                copy.sort((a, b) => a.localeCompare(b));
                combinationArr.add(copy.join(' '));
            }
            
            return;
        }
        
        for(let i = 0; i < bannedUserById[depth].length; i++) {
            v.push(bannedUserById[depth][i]);
            combination(v, depth + 1);
            v.pop();
        }
    }
    
    combination([], 0);
        
    return combinationArr.size;
}