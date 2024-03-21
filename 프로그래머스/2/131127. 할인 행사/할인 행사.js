function solution(want, number, discount) {
    let answer = 0;
    
    const isMatch = (discounts) => {
        let map = new Map();
        discounts.forEach((discount) => {
            map.set(discount, (map.get(discount) || 0) + 1);
        })
        
        for(let i = 0; i < want.length; i++) {
            if(map.get(want[i]) < number[i] || !map.get(want[i])) return false;
        }
        
        return true;
    }
    
    for(let i = 0; i <= discount.length - 10; i++) {
        let slice = discount.slice(i, i + 10);
        
        if(isMatch(slice)) answer++;
    }
    
    return answer;
}