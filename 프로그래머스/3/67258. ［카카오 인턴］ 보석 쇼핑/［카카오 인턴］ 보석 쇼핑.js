function solution(gems) {
    let answer = [1, gems.length];
    const uniqueGems = new Set(gems);
    
    if(uniqueGems.size === 1) return [1, 1];
    if(gems.length === uniqueGems.size) return [1, gems.length];
    
    let left = 0;
    let right = 0;
    
    const map = new Map();
    map.set(gems[0], 1);
    
    while(right < gems.length && left < gems.length) {
        if(map.size < uniqueGems.size) {
            right += 1;
            map.set(gems[right], (map.get(gems[right]) || 0) + 1);
        }
        else {
            if(map.get(gems[left]) >= 1) {
                const diff = right - left;
                const answerDiff = answer[1] - answer[0];
                if((diff < answerDiff) || (diff === answerDiff) && left < answer[0]) {
                    answer = [left + 1, right + 1];
                }
                map.set(gems[left], map.get(gems[left]) - 1);
            }
            if(map.get(gems[left]) === 0) {
                map.delete(gems[left]);
            }
            
            left += 1;
        }
    }
    
    return answer;
}