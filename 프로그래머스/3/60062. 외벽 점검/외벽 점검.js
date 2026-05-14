// n: 외벽의 길이
// weak: 취약 지점 위치
// dist: 친구가 1시간 동안 이동할 수 있는 거리가 담긴 배열
// 취약 지점을 점검하기 위해 보내야 하는 친구 수의 최소값
function solution(n, weak, dist) {
    let answer = -1;
    const doubleWeak = [...weak, ...(weak.map((v) => v + n))];
    const friends = [];

    const permutation = (visited, list) => {
        if(list.length === dist.length) {
            friends.push([...list]);
            return;
        }
        
        for(let i = 0; i < dist.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            list.push(dist[i]);
            permutation(visited, list);
            visited[i] = false;
            list.pop();
        }
    }
    
    const visited = new Array(dist.length).fill(false);
    permutation(visited, []);
    // console.log(friends);
    
    for(let friend of friends) {
        // 두배로 늘린 weak에서 각 인덱스를 시작점으로 잡아서 친구 보내기
        for(let i = 0; i < weak.length; i++) {
            let friendIdx = 0;
            let weakCnt = 0;
            let target = doubleWeak[i + weakCnt] + friend[friendIdx];
        
            while(weakCnt < weak.length && friendIdx < dist.length) {
                weakCnt += 1;
            
                // console.log(target, doubleWeak[i + weakCnt], i + weakCnt);
                if(weakCnt < weak.length && target < doubleWeak[i + weakCnt]) {
                    friendIdx += 1;
                    // console.log('friend 추가');
                    target = (doubleWeak[i + weakCnt] + friend[friendIdx]);
                }
            }
        
            // console.log('start', i, 'weakCnt', weakCnt, 'friend', friendIdx + 1, 'target', target);
            if(weakCnt === weak.length) {
                answer = Math.min(answer === -1 ? dist.length : answer, friendIdx + 1);
            }
        }
    }
    
    
    
    return answer;
}