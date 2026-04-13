// lock의 크기를 2배로 늘려서 key를 lock에 맞추기
// lock의 늘린 공간은 모두 true로 설정(맞아 떨어진다고 설정)
// key를 회전시켜 총 4번을 lock에 맞대어 확인
function solution(key, lock) {
    let answer = false;
    const n = lock.length;
    const m = key.length;
    const depth = 2 * m - 2 + n
    
    let doubleLock = Array.from({length: depth}, () => Array(depth).fill(0));
    const doubleN = doubleLock.length;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            doubleLock[i + m - 1][j + m - 1] = lock[i][j];
        }
    }
    
    const isMatch = (list) => {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                if(list[i + m - 1][j + m - 1] !== 1) return false;
            }
        }
        return true;
    }
    
    const rotate = (k) => {
        const size = k.length;
        const result = Array.from({length: size}, () => Array(size));
    
        for(let r = 0; r < size; r++) {
            for(let c = 0; c < size; c++) {
                result[c][size - r - 1] = k[r][c];
            }
        }
        
        return result;
    }
    
    let currentKey = key;
    for(let d = 0; d < 4; d++) {
        for(let i = 0; i <= doubleN - m; i++) {
            for(let j = 0; j <= doubleN - m; j++) {
                
                for(let r = 0; r < m; r++) {
                    for(let c = 0; c < m; c++) {
                        doubleLock[i + r][j + c] += currentKey[r][c];
                    }
                }
            
                if(isMatch(doubleLock)) {
                    return true;
                }
                
                for(let r = 0; r < m; r++) {
                    for(let c = 0; c < m; c++) {
                        doubleLock[i + r][j + c] -= currentKey[r][c];
                    }
                }
            }
        }
        currentKey = rotate(currentKey);
    }
    
    return answer;
}