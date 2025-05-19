function solution(gems) {
    let answer = [1, gems.length];
    const uniqueJewel = new Set(gems);
    const jewelMap = new Map();
    
    if(uniqueJewel.size === 1) {
        return [1, 1];
    }
    
    let startIdx = 0;
    gems.forEach((gem, idx) => {
        if(jewelMap.get(gem) !== undefined) {
            jewelMap.set(gem, jewelMap.get(gem) + 1);
            
            // 앞에 거 확인
            let deletedJewelIdx = startIdx;
            for(let i = startIdx; i < idx; i++) {
                const jewel = gems[i];
                if(jewelMap.get(jewel) > 1) {
                    jewelMap.set(jewel, jewelMap.get(jewel) - 1);
                    deletedJewelIdx += 1;
                }
                else {
                    startIdx = deletedJewelIdx;
                    break;
                }
            }
        }
        else {
            jewelMap.set(gem, 1);
        }
        
        if(jewelMap.size === uniqueJewel.size) {
            if(answer[1] - answer[0] > idx - startIdx) {
                answer = [startIdx + 1, idx + 1];
            }
        }
    })
    
    return answer;
}