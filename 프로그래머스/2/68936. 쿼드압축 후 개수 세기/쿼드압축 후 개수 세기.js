function solution(arr) {
    let zeroCount = 0;
    let oneCount = 0;
    
    const compress = (y, x, size) => {
        let firstValue = arr[y][x];
        let isSame = true;
        
        for(let i = y; i < y + size; i++) {
            for(let j = x; j < x + size; j++) {
                if(arr[i][j] !== firstValue) {
                    isSame = false;
                    break;
                }
            }
            if(!isSame) break;
        }
        
        if(isSame) {
            if(firstValue === 1) oneCount += 1;
            else zeroCount += 1;
            return;
        }
        
        let half = size / 2;
        compress(y, x, half);
        compress(y, x + half, half);
        compress(y + half, x, half);
        compress(y + half, x + half, half);
    }
    
    compress(0, 0, arr.length);
    
    return [zeroCount, oneCount];
}