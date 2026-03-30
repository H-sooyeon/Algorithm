function solution(places) {
    let answer = [];
    const n = 5;
        
    const isValid = (y, x, place) => {
        if(y >= n || y < 0 || x >= n || x < 0) return false;
        return true;
    }
    
    const isPerson = (y, x, place) => {
        if(place[y][x] === 'P') return true;
        return false;
    }
    const isTable = (y, x, place) => {
        if(place[y][x] === 'X') return true;
        return false;
    }
    
    // 맨헤튼 거리를 기준으로 주변에 다른 지원자가 없는지 확인
    const isPass = (y, x, place) => {
        // 지원자 기준 가로 gap 2
        for(let i = x - 1; i >= x - 2; i--) {
            if(!isValid(y, i, place)) break;
            if(isPerson(y, i, place)) return false;
            if(isTable(y, i, place)) break;
        }
        for(let i = x + 1; i <= x + 2; i++) {
            if(!isValid(y, i, place)) break;
            if(isPerson(y, i, place)) return false;
            if(isTable(y, i, place)) break;
        }
        
        // 지원자 기준 세로 gap 2
        for(let i = y - 1; i >= y - 2; i--) {
            if(!isValid(i, x, place)) break;
            if(isPerson(i, x, place)) return false;
            if(isTable(i, x, place)) break;
        }
        for(let i = y + 1; i <= y + 2; i++) {
            if(!isValid(i, x, place)) break;
            if(isPerson(i, x, place)) return false;
            if(isTable(i, x, place)) break;
        }
        
        // 지원자 기준 대각선 gap 1
        // console.log(y, x, y-1, x+1, n, isValid(y-1, x+1, place), y >= n,  y < 0,  x >= n, x < 0);
        // isValid(y-1, x+1, place) && console.log(place[y-1][x] !== 'X',place[y][x+1] !== 'X', isPerson(y-1, x+1, place))
        if(isValid(y-1, x-1, place) && (place[y-1][x] !== 'X' || place[y][x-1] !== 'X') && isPerson(y-1, x-1, place)) return false;
        if(isValid(y+1, x-1, place) && (place[y+1][x] !== 'X' || place[y][x-1] !== 'X') && isPerson(y+1, x-1, place)) return false;
        if(isValid(y-1, x+1, place) && (place[y-1][x] !== 'X' || place[y][x+1] !== 'X') && isPerson(y-1, x+1, place)) return false;
        if(isValid(y+1, x+1, place) && (place[y+1][x] !== 'X' || place[y][x+1] !== 'X') && isPerson(y+1, x+1, place)) return false;
        
        return true;
    }
    
    for(let place of places) {
        let flag = true;
        place = place.map((row) => row.split(''));
        // console.log(place);
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                if(place[i][j] === 'P') {
                    flag = isPass(i, j, place);
                    
                    if(!flag) {
                        answer.push(0);
                        break;
                    }
                }
            }
            if(!flag) break;
        }
        if(flag) answer.push(1);
    }
    
    
    return answer;
}