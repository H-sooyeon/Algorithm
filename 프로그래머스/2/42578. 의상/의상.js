function solution(clothes) {
    let answer = 1;
    let map = new Map();
    
    clothes.forEach(([value, key], i) => {
        if(map.has(key)) {
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
    })
    
    for(let [key, cnt] of map) {
        answer *= (cnt + 1);
    };
    
    answer--;
    
    return answer;
}