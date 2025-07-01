function solution(clothes) {
    let answer = 1;
    let map = new Map();
    
    // map으로 각 분류별 개수 세기
    clothes.forEach(([value, key], i) => {
        if(map.has(key)) {
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
    })
    
    // 사용하는 경우(총 개수) + 사용하지 않는 경우
    for(let [key, cnt] of map) {
        answer *= (cnt + 1);
    };
    
    // 모두 다 사용하지 않는 경우 빼주기
    answer--;
    
    return answer;
}