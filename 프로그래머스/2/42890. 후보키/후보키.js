function solution(relation) {
    let col_size = relation[0].length;
    let row_size = relation.length;
    let set = new Set();
    
    // 주어진 조합이 후보 키 목록에 있는지 확인하는 함수
    const isMinimal = (comb) => {
        for (let key of set) {
            if (key.every(col => comb.includes(col))) {
                return false;
            }
        }
        return true;
    };
    
    const combi = (start, b, k) => {
        if(b.length === k) {
            let check_set = new Set();
            
            for(let i = 0; i < row_size; i++) {
                let s = '';
                for(let j = 0; j < b.length; j++) {
                    s += relation[i][b[j]] + ' ';
                }
            
                check_set.add(s);
            }
            
            if(check_set.size === row_size && isMinimal(b)) {
                // 유일성이 만족된 경우 if문 안으로
                // 최소성 검사
                set.add([...b]);
            }
            
            return;
        }
        
        for(let i = start + 1; i < col_size; i++) {
            b.push(i);
            combi(i, b, k);
            b.pop();
        }
    }
    
    for(let i = 1; i <= col_size; i++) {
        combi(-1, [], i);
    }
    
    return set.size;
}