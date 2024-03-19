// header: yellow_hat, green_turban
// eyewear: blue_sunglasses
// 5 = 3 * 2 - 1

// face: corw_mask, blue_sunglasses, smoky_makeup
// 3
function solution(clothes) {
    let answer = 1;
    let map = new Map();
    
    for(let clothe of clothes) {
        if(map.has(clothe[1])) {
            map.get(clothe[1]).push(clothe[0]);
        }
        else map.set(clothe[1], [clothe[0]]);
    }
    
    // 키 개수 세기
    if(map.size === 1) {
        answer = map.get(clothes[0][1]).length;
    } else {
        for(let [key, value] of map) {
            answer *= (value.length + 1);
        }
        answer -= 1;
    }
    
    
    return answer;
}