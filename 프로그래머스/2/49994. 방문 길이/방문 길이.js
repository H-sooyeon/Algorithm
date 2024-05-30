function solution(dirs) {
    let answer = 0;
    let set = new Set();
    let cur = [0, 0];
    
    const outCheck = (y, x) => {
        if(y > 5 || y < -5 || x > 5 || x < -5) {
            return false;
        }
        return true;
    }
    
    // 방향 없이 길만 체크하므로 역방향도 더해주기
    for(let i = 0; i < dirs.length; i++) {
        if(dirs[i] === 'U') {
            if(outCheck(cur[0] + 1, cur[1])) {
                if(!set.has(`${cur[0] + 1} ${cur[1]} ${cur[0]} ${cur[1]}`)) {
                    set.add(`${cur[0]} ${cur[1]} ${cur[0] + 1} ${cur[1]}`);
                }
                cur = [cur[0] + 1, cur[1]];
            }
        }
        else if(dirs[i] === 'L') {
            if(outCheck(cur[0], cur[1] - 1)) {
                if(!set.has(`${cur[0]} ${cur[1] - 1} ${cur[0]} ${cur[1]}`)) {
                    set.add(`${cur[0]} ${cur[1]} ${cur[0]} ${cur[1] - 1}`);
                }
                cur = [cur[0], cur[1] - 1];
            }
        }
        else if(dirs[i] === 'R') {
            if(outCheck(cur[0], cur[1] + 1)) {
                if(!set.has(`${cur[0]} ${cur[1] + 1} ${cur[0]} ${cur[1]}`)) {
                    set.add(`${cur[0]} ${cur[1]} ${cur[0]} ${cur[1] + 1}`);
                }
                cur = [cur[0], cur[1] + 1];
            }
        }
        else {
            if(outCheck(cur[0] - 1, cur[1])) {
                if(!set.has(`${cur[0] - 1} ${cur[1]} ${cur[0]} ${cur[1]}`)) {
                    set.add(`${cur[0]} ${cur[1]} ${cur[0] - 1} ${cur[1]}`);
                }
                cur = [cur[0] - 1, cur[1]];
            }
        }
    }
    
    // console.log(set);
    
    return set.size;
}