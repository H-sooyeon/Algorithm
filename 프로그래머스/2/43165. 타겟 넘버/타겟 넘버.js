function solution(numbers, target) {
    let answer = 0;
    
    const dfs = (value, sum, idx) => {
        if(value.length === numbers.length) {
            if(sum === target) {
                answer++;
            }
            return;
        }
        
        let arr = [...value];
        arr.push(numbers[idx]);
        dfs(arr, sum + numbers[idx], idx+1);
        arr.pop();
        arr.push(-numbers[idx]);
        dfs(arr, sum - numbers[idx], idx+1);
    }
    
    dfs([numbers[0]], numbers[0], 1);
    dfs([-numbers[0]], -numbers[0], 1);
    
    return answer;
}