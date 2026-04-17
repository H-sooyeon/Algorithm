// 맞춘 화살 개수 어피치 >= 라이언 어피치 승
// k점 여러 발 맞혀도 k점 가져감
// 라이언과 어피치 모두 k점에 하나도 맞히지 못한 경우 점수 안가져감
// 최종 점수가 같은 경우 어피치 우승
function solution(n, info) {
    let answer = [];
    let maxDiff = 0;
    const visited = new Array(info.length).fill(false);
    
    // 최대 개수는 11 백트래킹으로 어느 점수를 맞출 것인지 리스트 추출
    // 맞춘 화살의 개수가 n보다 크다면 return
    // 어피치를 이길 수 있다면 갱신
    const backtrack = (start, list, visited, depth) => {
        if(list.length === depth) {
            // 라이언의 점수 계산 (어피치보다 더 많은 화살을 쏘도록 해서)
            let shootCnt = 0;
            const lionInfo = new Array(11).fill(0);
            
            for(const target of list) {
                const required = info[target] + 1;
                shootCnt += required;
                lionInfo[target] = required;
            }
            
            // 화살이 남으면 가장 낮은 점수 몰아주기
            if(shootCnt > n) return;
            if(n - shootCnt > 0) lionInfo[10] += (n - shootCnt);
            
            let apeachTotal = 0;
            let score = 0;
            for(let i = 0; i <= 10; i++) {
                if(lionInfo[i] > info[i]) {
                    score += (10 - i);
                } else if(info[i] > 0) {
                    apeachTotal += (10 - i);
                }
            }
            
            if(score <= apeachTotal) return;
            
            if(!answer.length) {
                answer = lionInfo;
                maxDiff = Math.abs(apeachTotal - score);
                return;
            }
            
            // 기존 값이랑 비교
            const newDiff = Math.abs(apeachTotal - score)
            
            if(maxDiff > newDiff) return;
            if(maxDiff < newDiff) {
                answer = lionInfo;
                maxDiff = newDiff;
                return;
            }
            
            // 낮은 점수를 더 많이 맞힌 경우 갱신
            for(let i = 10; i >= 0; i--) {
                if(answer[i] < lionInfo[i]) {
                    // 교체
                    answer = lionInfo;
                    return;
                }
            }
            return;
        }
        
        for(let i = start + 1; i < info.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            list.push(i);
            backtrack(i, list, visited, depth);
            list.pop();
            visited[i] = false;
        }
    }
    
    for(let select = 1; select < 11; select++) {
        if(n < select) break;
        backtrack(-1, [], visited, select);
    }
    
    // console.log('어피치 점수:', apeachScore);
    // console.log('라이언 점수:', lionScore);
    // console.log('answer', answer);
    
    if(!answer.length) return [-1];
    return answer;
}