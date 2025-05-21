// build_frame [x, y, a, b]
// a-0: 기둥, 1: 보 b-0: 삭제, 1: 설치
function solution(n, build_frame) {
    const graph = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Array(2).fill(false))); // 3차 배열, 기둥과 보
    let frames = [];
    
    const installFrame = (frame) => {
        const [x, y, a] = frame;
        // console.log('install');
        
        if(a === 0) { // 기둥
            // 바닥이라면 그냥 설치
            if(y === 0) {
                graph[y][x][0] = true;
                frames.push(frame);
            }
            else {
                // 기둥은 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
                if(graph[y][x][1] || (x-1 >= 0 && graph[y][x-1][1]) || (y-1 >= 0 && graph[y-1][x][0])) {
                    frames.push(frame);
                    graph[y][x][0] = true;
                }
            }
        }
        else { // 보
            // 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.
            if((y-1 >= 0 && graph[y-1][x][0]) || (x+1 <= n && y-1 >= 0 && graph[y-1][x+1][0]) || ((x-1 >= 0 && graph[y][x-1][1]) && (x+1 <= n && graph[y][x+1][1]))) {
                frames.push(frame);
                graph[y][x][1] = true;
            }
        }
    }
    
    const isPossible = (frame) => {
        const [x, y, a] = frame;
        
        if(a === 0) { // 기둥
            if(y === 0) return true;
            // 기둥은 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
            if(graph[y][x][1] || (x-1 >= 0 && graph[y][x-1][1]) || (y-1 >= 0 && graph[y-1][x][0])) {
                return true;
            }
            return false;
        }
        else { // 보
            // 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.
            // console.log('frame', frame);
            // console.log('한쪽 끝 부분이 기둥 위에 있거나', y-1 >= 0 && graph[y-1][x][0]);
            // console.log('한쪽 끝 부분이 기둥 위에 있거나', (x+1 <= n && y-1 >= 0 && graph[y-1][x+1][0]));
            // console.log('양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.', ((x-1 >= 0 && graph[y][x-1][1]) && (x+1 <= n && graph[y][x+1][1])));
            if((y-1 >= 0 && graph[y-1][x][0]) || (x+1 <= n && y-1 >= 0 && graph[y-1][x+1][0]) || ((x-1 >= 0 && graph[y][x-1][1]) && (x+1 <= n && graph[y][x+1][1]))) {
                return true;
            }
            return false;
        }
    }
    
    // frame을 제거한 후 모든 frame들이 조건을 만족하는지 확인
    // 조건을 만족하지 않는 frame이 나온다면 frames에 다시 add하여 continue
    const removeFrame = (frame) => {
        const [x, y, a] = frame;
        // console.log('remove');
        
        graph[y][x][a] = false;
        const removedFrames = frames.filter(([fx, fy, fa]) => {
            return (fx !== x || fy !== y || fa !== a);
        })
        
        // removedFrames에서의 모든 frame들이 문제의 조건을 만족하는지 check
        let flag = true;
        removedFrames.forEach((item) => {
            if(!isPossible(item)) {
                // console.log(item, 'frame이 조건을 만족하지 않아 삭제할 수 없다');
                flag = false;
                graph[y][x][a] = true;
                return;
            }
        })
        
        if(flag) {
            frames = removedFrames;
        } 
    }
    
    build_frame.forEach((frame) => {
        const [x, y, a, b] = frame;
        
        if(b === 0) { // frame 삭제
            removeFrame([x, y, a]);
        }
        else { // frame 설치
            installFrame([x, y, a]);
        }
    })
    
    frames.sort((a, b) => {
        if(a[0] !== b[0]) return a[0] - b[0];
        if(a[1] !== b[1]) return a[1] - b[1];
        else return a[2] - b[2];
    })
        
    return frames;
}