function solution(key, lock) {
    let n = lock.length;
    let m = key.length;
    let arr = Array.from({length: n * 3}, () => Array(n * 3).fill(0));
    
    // key에 있는 돌기의 갯수가 lock의 홈 갯수보다 작으면 열쇠로 자물쇠를 열수 없음
    let key_cnt = 0;
    let lock_cnt = 0;
    key.flat().map((v) => {
        if(v === 1) key_cnt++;
    })
    
    lock.flat().map((v) => {
        if(v === 0) lock_cnt++;
    })
    
    if(key_cnt < lock_cnt) return false;
    
    for(let i = n; i < n * 2; i++) {
        for(let j = n; j < n * 2; j++) {
            arr[i][j] = lock[i - n][j - n];
        }
    }
    
    const check = (newList) => {
        for(let i = n; i < n * 2; i++) {
            for(let j = n; j < n * 2; j++) {
                if(newList[i][j] !== 1) return false;
            }
        }
        return true;
    }
    
    const rotate = () => {
        let newKey = [];
        
        for(let j = 0; j < m; j++) {
            let tmp = [];
            for(let i = m - 1; i >= 0; i--) {
                tmp.push(key[i][j]);
            }
            
            newKey.push(tmp);
        }
        
        return newKey;
    }
    
    // 0, 90, 180, 270도 회전
    for(let x = 0; x < 4; x++) {
        for(let i = 0; i < arr.length - m; i++) {
            for(let j = 0; j < arr.length - m; j++) {  
                
                let newArr = arr.map((row) => row.slice());
                for(let a = 0; a < m; a++) {
                    for(let b = 0; b < m; b++) {
                        newArr[i + a][j + b] = key[a][b] + arr[i + a][j + b];
                    }
                }
        
                // 확장된 lock에 key가 들어가는지 확인
                if(check(newArr)) {
                    return true;
                }
            }
        }
        
        // 회전
        key = rotate();
    }
    
    
    return false;
}