function solution(maze) {
    let answer = Number.MAX_SAFE_INTEGER;
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const n = maze.length;
    const m = maze[0].length;
    
    let redStartPos = [0, 0];
    let blueStartPos = [0, 0];
    let redDesPos = [0, 0];
    let blueDesPos = [0, 0];
    
    const redVisited = Array.from({length: n}, () => Array(m).fill(false));
    const blueVisited = Array.from({length: n}, () => Array(m).fill(false));
    
    // red, blue의 시작과 도착 칸 저장
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            // 0은 빈칸, 5는 벽을 의미
            if(maze[i][j] === 0 || maze[i][j] === 5) continue;
            
            if(maze[i][j] === 1) {
                redStartPos = [i, j];
                redVisited[i][j] = true;
            }
            else if(maze[i][j] === 2) {
                blueStartPos = [i, j];
                blueVisited[i][j] = true;
            }
            else if(maze[i][j] === 3) {
                redDesPos = [i, j];
            }
            else if(maze[i][j] === 4) {
                blueDesPos = [i, j];
            }
        }
    }
    
    // 수레가 이동할 수 있는 위치인가
    const isPossible = (type, y, x, redVisited, blueVisited) => {
        // 벽이나 격자 판 밖으로 움직일 수 없다.
        if(y >= n || y < 0 || x >= m || x < 0 || maze[y][x] === 5) return false;
        
        if(type === 1 && redVisited[y][x]) return false;
        else if(type === 2 && blueVisited[y][x]) return false;
        
        return true;
    }
    
    const isCrossRedBluePos = (red, blue, nextRed, nextBlue) => {
        const [ry, rx] = red;
        const [by, bx] = blue;
        
        const [nry, nrx] = nextRed;
        const [nby, nbx] = nextBlue;
        
        if((nry === by && nrx === bx) && (nby === ry && nbx === rx)) {
            // 수레끼리 자리를 바꾸며 움직일 수 없다.
            return true;
        }
        if(nry === nby && nrx === nbx) {
            // 동시에 두 수레를 같은 칸으로 움직일 수 없다.
            return true;
        }
        
        return false;
    }
    
    const isRedArrived = (y, x) => {
        if(y === redDesPos[0] && x === redDesPos[1]) return true;
        return false;
    }
    
    const isBlueArrived = (y, x) => {
        if(y === blueDesPos[0] && x === blueDesPos[1]) return true;
        return false;
    }
    
    const dfs = (red, blue, redVisited, blueVisited, turn) => {
        let [ry, rx] = red;
        let [by, bx] = blue;
        
        // 모두 도착 칸으로 이동했다면 return
        if((ry === redDesPos[0] && rx === redDesPos[1]) && 
           (by === blueDesPos[0] && bx === blueDesPos[1])) {
            answer = Math.min(turn, answer);
            return;
        }
        
        for(let i = 0; i < 4; i++) {
            // red 위치 확인
            let rny = ry + dy[i];
            let rnx = rx + dx[i];
            
            // 자신의 도착 칸에 위치한 수레는 움직이지 않는다.
            if(isRedArrived(ry, rx)) {
                rny = ry;
                rnx = rx;
                redVisited[ry][rx] = false;
            }
            
            if(!isPossible(1, rny, rnx, redVisited, blueVisited)) continue;
            
            // blue 위치 확인
            for(let j = 0; j < 4; j++) {
                let bny = by + dy[j];
                let bnx = bx + dx[j];
                    
                // 자신의 도착 칸에 위치한 수레는 움직이지 않는다.
                if(isBlueArrived(by, bx)) {
                    bny = by;
                    bnx = bx;
                    blueVisited[by][bx] = false;
                }
                    
                if(!isPossible(2, bny, bnx, redVisited, blueVisited)) continue;
                if(isCrossRedBluePos(red, blue, [rny, rnx], [bny, bnx])) continue;
                    
                if (!isRedArrived(ry, rx)) redVisited[rny][rnx] = true;
                if (!isBlueArrived(by, bx)) blueVisited[bny][bnx] = true;
                // red와 blue 모두 가능하다면 이동하기
                dfs([rny, rnx], [bny, bnx], redVisited, blueVisited, turn + 1);
                
                if(!isRedArrived(ry, rx)) redVisited[rny][rnx] = false;
                if(!isBlueArrived(by, bx)) blueVisited[bny][bnx] =false;
            }
        }
    }
    
    dfs(redStartPos, blueStartPos, redVisited, blueVisited, 0);
    
    // 퍼즐을 풀 수 없는 경우 0 return
    if(answer === Number.MAX_SAFE_INTEGER) return 0;
    return answer;
}