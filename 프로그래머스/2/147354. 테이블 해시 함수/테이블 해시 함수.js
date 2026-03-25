function solution(data, col, row_begin, row_end) {    
    const hashFunc = (col, row_begin, row_end) => {
        const sortedData = data.sort((a, b) => {
            if(a[col-1] === b[col-1]) {
                return b[0] - a[0];
            }
            return a[col-1] - b[col-1];
        })
        
        let s = 0;
        for(let i = 0; i < data.length; i++) {
            let s_i = 0;
            for(let j = 0; j < data[i].length; j++) {
                s_i += data[i][j] % (i + 1)
            }
            
            if(i + 1 >= row_begin && i + 1 <= row_end) {
                s ^= s_i;
            }
        }
        return s;
    }
    
    return hashFunc(col, row_begin, row_end);
}