function solution(priorities, location) {
    let answer = 1;
    
    let max_value = Math.max(...priorities);
    while(true) {
        let value = priorities.shift();
                
        if(value === max_value) {
            if(location === 0) break;
            answer++;
            max_value = Math.max(...priorities);
        } else {
            priorities.push(value);
        }
        
        location = location === 0 ? priorities.length - 1 : location - 1;
    }
    
    return answer;
}