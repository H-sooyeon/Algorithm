function solution(rows, columns, queries) {
    let answer = [];
    const arr = Array.from({ length: rows }, (_, i) => Array.from({ length: columns }, (_, j) => i * columns + j + 1));
    
    for(let i = 0; i < queries.length; i++) {
        let [y1, x1, y2, x2] = queries[i];
        x1-=1; y1-=1; x2-=1; y2-=1;
        let min_v = arr[y1][x1];
        
        // 상단 가로 오른쪽 방향
        let tmp = arr[y1][x2];
        for(let j = x2; j > x1; j--) {
            min_v = Math.min(min_v, arr[y1][j]);
            
            arr[y1][j] = arr[y1][j-1]
        }
        
        // 오른쪽 세로 아래 방향
        let v = arr[y2][x2];
        for(let j = y2; j > y1; j--) {
            min_v = Math.min(min_v, arr[j][x2]);
            
            arr[j][x2] = arr[j-1][x2];
        }
        arr[y1+1][x2] = tmp;
        
        // 하단 가로 왼쪽 방향
        tmp = v;
        v = arr[y2][x1];
        for(let j = x1; j < x2; j++) {
            min_v = Math.min(min_v, arr[y2][j]);
            
            arr[y2][j] = arr[y2][j+1];
        }
        arr[y2][x2-1] = tmp;
        
        // 왼쪽 세로 위 방향
        tmp = v;
        for(let j = y1; j < y2; j++) {
            min_v = Math.min(min_v, arr[j][x1]);
            
            arr[j][x1] = arr[j+1][x1];
        }
        arr[y2-1][x1] = tmp;
        answer.push(min_v);
    }
    
    
    
    return answer;
}