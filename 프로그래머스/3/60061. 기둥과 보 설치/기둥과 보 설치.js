// 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나 다른 기둥 위에 있어야 한다.
// 보는 한쪽 끝 부분이 기둥 위에 있거나, 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.
// a 0은 기둥, 1은 보
// b 0은 삭제, 1은 설치
function solution(n, build_frame) {
    let answer = [];
    const frames = new Set(); // x,y,a
    
    const isValidPillar = (frames, [x, y]) => {
        // 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나 다른 기둥 위에 있어야 한다.
        if(frames.has(`${x},${y-1},${0}`)) { // 다른 기둥 위에 있거나
            return true;
        }
        if(y === 0) { // 바닥에 있거나
            return true;
        }
        
        const bottomLeft = `${x-1},${y},${1}`;
        const bottomRight = `${x},${y},${1}`;
        
        // 보의 한쪽 끝 부분에 있거나
        if(frames.has(bottomLeft) || frames.has(bottomRight)) {
            return true;
        }
        
        return false;
    }
    
    const isValidBeam = (frames, [x, y]) => {
        // 보는 한쪽 끝 부분이 기둥 위에 있거나, 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.
        
        // 한쪽 끝 부분이 기둥 위에 있거나
        if(frames.has(`${x},${y-1},${0}`) || frames.has(`${x+1},${y-1},${0}`)) {
            return true;
        }
        // 양쪽 끝 부분이 다른 보와 동시에 연결되어 있거나
        if(frames.has(`${x-1},${y},${1}`) && frames.has(`${x+1},${y},${1}`)) {
            return true;
        }
        
        return false;
    }
    
    const isValid = (frames) => {
        let flag = true;
        
        for(let frame of frames) {
            const [x,y,a] = frame.split(',').map(Number);
            if(a === 0 && !isValidPillar(frames, [x,y])) {
                flag = false;
                break;
            }
            if(a === 1 && !isValidBeam(frames, [x,y])) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    
    for(let frame of build_frame) {
        const [x, y, a, b] = frame;
        const key = `${x},${y},${a}`;
        
        if(b === 0) {
            // 삭제
            frames.delete(key);
            if(!isValid(frames)) {
                frames.add(key);
            }
        }
        else {
            // 설치
            // 설치할 때는 다른 프레임까지 확인할 필요가 없고 설치하는 프레임이 유효한지 보면 됨
            if(a === 0) {
                // 기둥
                if(isValidPillar(frames, [x, y])) {
                    frames.add(key);
                }
            }
            else {
                // 보
                if(isValidBeam(frames, [x, y])) {
                    frames.add(key);
                }
            }
        }
    }
    
    for(let frame of frames) {
        answer.push(frame.split(',').map(Number));
    }
    
    answer.sort((a, b) => {
        if(a[0] === b[0] && a[1] === b[1]) return a[2] - b[2];
        if(a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    })
    
    // console.log(frames);
    
    return answer;
}