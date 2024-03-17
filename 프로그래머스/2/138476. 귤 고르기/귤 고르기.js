function solution(k, tangerine) {
    let answer = 0;
    let mandarins = [];
    
    let map = new Map();
    for(let i = 0; i < tangerine.length; i++) {
        if(map.has(tangerine[i])) {
            let value = map.get(tangerine[i]);
            map.set(tangerine[i], value + 1);
        } else {
            map.set(tangerine[i], 1);
        }
    }
    
    for([key, value] of map) {
        mandarins.push(value);
    }
    mandarins.sort((a, b) => b - a);
    
    let sum = 0;
    for(let mandarin of mandarins) {
        if(sum < k) {
            sum += mandarin;
            answer++;
        } else break;
    }
    
    return answer;
}