function solution(n) {
    // 퀸은 가로/세로/대각선으로 이동할 수 있다.
    // 한 열에 하나의 퀸
    // 한 행에 하나의 퀸
    // 백트래킹으로 가능한 위치에 퀸을 놓고 최종 퀸의 개수 찾기
    let answer = 0;
    
    const findQueen = (list, curRow) => {
        // console.log('list', list);
        // console.log('curRow', curRow);
        if(curRow >= n) {
            if(list.length === n) answer += 1;
            return;
        }
        
        // [curRow, i]
        for(let i = 0; i < n; i++) {
            let flag = true;
            for(let [y, x] of list) {
                if(x === i) {
                    flag = false;
                    break;
                }
                
                // 대각선 체크
                const dy = Math.abs(y - curRow);
                const dx = Math.abs(x - i);
                
                if(dy === dx) {
                    flag = false;
                    break;
                }
            }
            
            if(flag) {
                list.push([curRow, i]);
                findQueen(list, curRow + 1)
                list.pop();
            }
        }
    }
    
    findQueen([], 0);
    
    return answer;
}