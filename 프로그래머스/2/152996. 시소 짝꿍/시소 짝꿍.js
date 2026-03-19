function solution(weights) {
    let answer = 0;
    const store = new Map();
    
    for(let weight of weights) {
        store.set(weight, (store.get(weight) || 0) + 1);
    }
    
    // 비율로 계산
    // 2:3 -> 1:3/2, 2:4 -> 1:2, 3:4 -> 1:4/3
    for(let [weight, count] of store) {
        if(count > 1) answer += (count * (count - 1) / 2);
        
        if(store.has(weight * (3 / 2))) answer += store.get(weight * (3 / 2)) * count;
        if(store.has(weight * 2)) answer += store.get(weight * 2) * count;
        if(store.has(weight * (4 / 3))) answer += store.get(weight * (4 / 3)) * count;
    }
    
    return answer;
}