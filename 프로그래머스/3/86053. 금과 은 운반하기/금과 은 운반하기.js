function solution(a, b, g, s, w, t) {
    let answer = -1n;
    const cityCnt = g.length;

    const isPossible = (time) => {
        // 각 도시별 금, 은 조달 수
        let total = 0n;
        let gold = 0n;
        let silver = 0n;
        
        for(let i = 0; i < cityCnt; i++) {
            const cityTime = BigInt(t[i]);
            let moveCnt = BigInt(time) / (2n * cityTime); // 해당 시간에 옮길 수 있는 횟수
            const extraTrip = (BigInt(time) % (2n * cityTime)) >= cityTime ? 1n : 0n;
            const totalMove = moveCnt + extraTrip;
            
            // 조달 가능한 무게
            const maxCarry = totalMove * BigInt(w[i]);
            const maxAvailable = BigInt(g[i]) + BigInt(s[i]);
            const weight = maxCarry > maxAvailable ? maxAvailable : maxCarry;
            
            total += weight;
            gold += weight < BigInt(g[i]) ? weight : BigInt(g[i]);
            silver += weight < BigInt(s[i]) ? weight : BigInt(s[i]);
        }
        
        if(total >= BigInt(a + b) && gold >= BigInt(a) && silver >= BigInt(b)) return true;
        return false;
    }
    
    let start = 1n;
    let end = BigInt(1e9 * 2 * 1e5 * 2); // 금과 은에 대해 각 도시 두 번씩 방문, w=1이라 생각
    
    while(start <= end) {
        let mid = (start + end) / 2n;
        
        if(isPossible(mid)) {
            end = mid - 1n;
            answer = mid;
        } else {
            start = mid + 1n;
        }
    }
    
    return answer;
}