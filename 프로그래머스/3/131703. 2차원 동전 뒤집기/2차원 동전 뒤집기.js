function solution(beginning, target) {
    let answer = 987654321;
    // 같은 행/열에 있는 동전을 모두 뒤집어야 한다. 특정 동전만 뒤집을 수 없다.
    const n = beginning.length;
    const m = beginning[0].length;
    let arr1 = beginning.map((row) => row.slice());
    let arr2 = beginning.map((row) => row.slice());
    let arr3 = beginning.map((row) => row.slice());
    let arr4 = beginning.map((row) => row.slice());
    const reverseSum = [];
    let reverseRowList = [];
    let reverseColList = [];
    
    const reverseRow = (idxList, arr) => {
        idxList.forEach((idx) => {
            for(let j = 0; j < m; j++) {
                if(arr[idx][j] === 1) arr[idx][j] = 0;
                else if(arr[idx][j] === 0) arr[idx][j] = 1;
            }
        })
        return arr;
    }
    
    const reverseCol = (idxList, arr) => {
        idxList.forEach((idx) => {
            for(let i = 0; i < n; i++) {
                if(arr[i][idx] === 1) arr[i][idx] = 0;
                else if(arr[i][idx] === 0) arr[i][idx] = 1;
            }
        })
        return arr;
    }
    
    const isSameWithTarget = (target, arr) => {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                if(target[i][j] !== arr[i][j]) return false;
            }
        }
        
        return true;
    }
    
    // 1. 행의 첫 원소가 다르다면 행 뒤집기 -> 열 첫 원소가 다르다면 열 뒤집기
    for(let i = 0; i < n; i++) {
        if(arr1[i][0] !== target[i][0]) {
            reverseRowList.push(i);
        }
    }
    
    // row 한 번에 뒤집기
    arr1 = reverseRow(reverseRowList, arr1);
    
    for(let j = 0; j < m; j++) {
        if(arr1[0][j] !== target[0][j]) {
            reverseColList.push(j);
        }
    }
    
    // col 한 번에 뒤집기
    arr1 = reverseCol(reverseColList, arr1);
    reverseSum.push(reverseRowList.length + reverseColList.length);
    reverseRowList = [];
    reverseColList = [];
    
    // 2. 행의 첫 원소가 같다면 행 뒤집기 -> 열 첫 원소가 다르다면 열 뒤집기
    for(let i = 0; i < n; i++) {
        if(arr2[i][0] === target[i][0]) {
            reverseRowList.push(i);
        }
    }
    
    arr2 = reverseRow(reverseRowList, arr2);
    
    for(let j = 0; j < m; j++) {
        if(arr2[0][j] !== target[0][j]) {
            reverseColList.push(j);
        }
    }
    
    arr2 = reverseCol(reverseColList, arr2);
    reverseSum.push(reverseRowList.length + reverseColList.length);
    reverseRowList = [];
    reverseColList = [];
    
    // 3. 열의 첫 원소가 다르다면 열 뒤집기 -> 행 첫 원소가 다르다면 행 뒤집기
    for(let i = 0; i < n; i++) {
        if(arr3[i][0] === target[i][0]) {
            reverseRowList.push(i);
        }
    }
    
    arr3 = reverseRow(reverseRowList, arr3);
    
    for(let j = 0; j < m; j++) {
        if(arr3[0][j] !== target[0][j]) {
            reverseColList.push(j);
        }
    }
    
    arr3 = reverseCol(reverseColList, arr3);
    reverseSum.push(reverseRowList.length + reverseColList.length);
    reverseRowList = [];
    reverseColList = [];
    
    // 4. 열의 첫 원소가 같다면 열 뒤집기 -> 행 첫 원소가 다르다면 행 뒤집기
    for(let i = 0; i < n; i++) {
        if(arr4[i][0] === target[i][0]) {
            reverseRowList.push(i);
        }
    }
    
    arr4 = reverseRow(reverseRowList, arr4);
    
    for(let j = 0; j < m; j++) {
        if(arr4[0][j] !== target[0][j]) {
            reverseColList.push(j);
        }
    }
    
    arr4 = reverseCol(reverseColList, arr4);
    reverseSum.push(reverseRowList.length + reverseColList.length);
    
    const isSameArr = [];
    isSameArr.push(isSameWithTarget(target, arr1));
    isSameArr.push(isSameWithTarget(target, arr2));
    isSameArr.push(isSameWithTarget(target, arr3));
    isSameArr.push(isSameWithTarget(target, arr4));
    
    isSameArr.forEach((isSame, idx) => {
        if(isSame) {
            answer = Math.min(reverseSum[idx], answer);
        }
    })
    
    if(answer === 987654321) {
        return -1;
    }
    
    return answer;
}