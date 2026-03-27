function solution(rows, columns, queries) {
    let answer = [];
    // 행렬 초기화
    const arr = Array.from({length: rows}, (_, r) => 
        Array.from({length: columns}, (_, c) => r * columns + c + 1)
    );
        
    for(let query of queries) {
        const [y1, x1, y2, x2] = query.map((val) => val - 1);
        const modifiedValues = [];
        
        // 1. 시작점(좌상단) 값을 하나만 미리 빼둡니다.
        const startValue = arr[y1][x1];
        modifiedValues.push(startValue);

        // 2. 좌측 세로 (위로 당기기)
        for(let i = y1; i < y2; i++) {
            arr[i][x1] = arr[i+1][x1];
            modifiedValues.push(arr[i][x1]);
        }

        // 3. 하단 가로 (왼쪽으로 당기기)
        for(let i = x1; i < x2; i++) {
            arr[y2][i] = arr[y2][i+1];
            modifiedValues.push(arr[y2][i]);
        }

        // 4. 우측 세로 (아래로 당기기)
        for(let i = y2; i > y1; i--) {
            arr[i][x2] = arr[i-1][x2];
            modifiedValues.push(arr[i][x2]);
        }

        // 5. 상단 가로 (오른쪽으로 당기기)
        for(let i = x2; i > x1 + 1; i--) {
            arr[y1][i] = arr[y1][i-1];
            modifiedValues.push(arr[y1][i]);
        }
        
        // 6. 비어있는 y1, x1+1 자리에 처음에 빼둔 startValue를 넣습니다.
        arr[y1][x1+1] = startValue;
        
        // 최솟값 찾기
        answer.push(Math.min(...modifiedValues));
    }
        
    return answer;
}