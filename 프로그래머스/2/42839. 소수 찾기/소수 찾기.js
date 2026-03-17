function solution(numbers) {
    let answer = 0;
    const copyNumbers = numbers.split('');
    const values = new Set();
    
    // 최대 7이므로 순열로 완전탐색을 진행
    // 각 값을 숫자로 바꾼 뒤 해당 값이 소수인지 판단
    // 소수인지 판단은 에라스토테레스의 체를 활용
    // 최대 길이 7이며 9까지의 숫자만으로 이루어져있으므로 
    // 10000000 까지의 값으로 미리 데이터를 넣어두고 사용
    // -> 양이 너무 많으니, 순열로 알아낸 숫자만을 소수인지 판별
    
    const visited = new Array(copyNumbers.length).fill(false);
    
    const permutation = (visited, list) => {
        if(list.length && !values.has(Number(list.join('')))) {
            values.add(Number(list.join('')));
        }
        
        if(list.length === copyNumbers.length) {
            return;
        }
        
        for(let i = 0; i < copyNumbers.length; i++) {
            if(visited[i]) continue;
            
            list.push(copyNumbers[i]);
            visited[i] = true;
            permutation(visited, list);
            visited[i] = false;
            list.pop();
        }
    }
    
    permutation(visited, []);
    
    const isPrime = (num) => {
        if(num < 2) return false;
        for(let i = 2; i <= Math.sqrt(num); i++) {
            if(num % i === 0) return false;
        }
        return true;
        
    }
    
    for(let value of values) {
        if(isPrime(value)) answer += 1;
    }
    
    return answer;
}