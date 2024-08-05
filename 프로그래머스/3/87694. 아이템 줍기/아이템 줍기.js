function solution(rectangle, characterX, characterY, itemX, itemY) {
    characterX *= 2;
    characterY *= 2;
    itemX *= 2;
    itemY *= 2;
    
    let graph = Array.from({length: 103}, () => Array(103).fill(0));
    let doubleRec = rectangle.map(rec => rec.map(point => point * 2));
    
    for(let i = 0; i < doubleRec.length; i++) {
        let [lbx, lby, rtx, rty] = doubleRec[i];
        
        // 좌측 하단에서 좌측 상단으로
        for(let j = lby; j <= rty; j++) {
            graph[j][lbx] = 1;
        }
        
        // 상단
        for(let j = lbx; j <= rtx; j++) {
            graph[lby][j] = 1;
        }
        
        // 오른쪽
        for(let j = lby; j <= rty; j++) {
            graph[j][rtx] = 1;
        }
        
        // 하단      
        for(let j = lbx; j <= rtx; j++) {
            graph[rty][j] = 1;
        }
        
    }
    
    for(let i = 0; i < doubleRec.length; i++) {
        let [lbx, lby, rtx, rty] = doubleRec[i];
        
        // 내부 채워주기
        for(let j = lby + 1; j < rty; j++) {
            for(let k = lbx + 1; k < rtx; k++) {
                graph[j][k] = 2;
            }
        }
    }
    
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    
    let queue = [];
    queue.push([characterY, characterX, 0]);
    graph[characterY][characterX] = 0
    
    while(queue.length) {
        let [y, x, cnt]= queue.shift();
        
        if(y === itemY && x === itemX) {
            return cnt / 2;
        }
        
        for(let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            
            if(graph[ny][nx] === 1) {
                queue.push([ny, nx, cnt + 1]);
                graph[ny][nx] = 0;
            }
        }
    }
    
//     const dfs = (y, x, cnt) => {
//         visited[y][x] = true;
        
//         if(y === itemY && x === itemX) {
//             answer = Math.min(answer, cnt);
//             visited[y][x] = false;
//             return;
//         }
        
//         for(let i = 0; i < 4; i++) {
//             let ny = y + dy[i];
//             let nx = x + dx[i];
            
//             if(ny >= max_v + 1 || ny < 0 || nx >= max_v + 1 || nx < 0) continue;
//             if(visited[ny][nx] || graph[ny][nx] > 1 || graph[ny][nx] === 0) continue;
            
//             dfs(ny, nx, cnt + 1);
//         }
//     }
    
//     dfs(characterY, characterX, 0);
    
    return 0;
}