// 홈: 0, 돌기: 1
function solution(key, lock) {
    const m = key.length;
    const n = lock.length;
    
    // Lock의 크기를 3배로 늘려 key를 늘린 lock에 대해 모두 탐색
    const increasedLock = Array.from({length: n * 3}, () => Array(n * 3).fill(0));
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            increasedLock[n + i][n + j] = lock[i][j];
        }
    }
        
    const circulateKey = (prevKey) => {
        // 90도 회전시키기
        const newKey = Array.from({length: m}, () => Array(m));
        
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < m; j++) {
                newKey[j][m-1-i] = prevKey[i][j];
            }
        }
        
        return newKey;
    }
    
    const checkLock = (newLock) => {
        for(let i = n; i < n * 2; i++) {
            for(let j = n; j < n * 2; j++) {
                if(newLock[i][j] !== 1) return false;
            }
        }
        
        return true;
    }
    
    let prevKey = key;
    for(let d = 0; d < 4; d++) {
        const newKey = circulateKey(prevKey);
        
        for(let i = 0; i < increasedLock.length - m; i++) {
            for(let j = 0; j < increasedLock.length - m; j++) {
                const newLock = increasedLock.map((v) => v.slice());
                
                for(let p = 0; p < m; p++) {
                    for(let q = 0; q < m; q++) {
                        newLock[i+p][j+q] += newKey[p][q];
                    }
                }
                
                if(checkLock(newLock)) return true;
            }
        }
        
        prevKey = newKey;
    }
    
    return false;
}