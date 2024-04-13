function solution(numbers) {
    let answer = 0;
    let arr = numbers.split('');
    
    let combi_arr = new Set();
    let visited = new Array(arr.length).fill(false);
    
    const combi = (v, k) => {
        if(v.length === k) {
            let str = '';
            for(let i of v) str += arr[i];
            let parseNum = parseInt(str);
            if(parseNum === 1 || parseNum === 0) return;
            combi_arr.add(parseNum);
            return;
        }
        
        for(let i = 0; i < arr.length; i++) {
            if(visited[i]) continue;
            
            v.push(i);
            visited[i] = true;
            combi(v, k);
            v.pop();
            visited[i] = false;
        }
    }
    
    for(let i = 1; i <= numbers.length; i++) {
        combi([], i);
        visited.fill(false);
    }
    
    // 소수인지 확인
    const isDecimal = (num) => {
        let flag = true;
        for(let i = 2; i <= Math.sqrt(num); i++) {
            if(num % i === 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    
    // console.log(combi_arr);
    for(let num of combi_arr) {
        if(isDecimal(num)) answer++;
    }
    
    return answer;
}