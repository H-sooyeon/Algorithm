function solution(n, words) {
    let answer = [0, 0];
    let set = new Set();
    let people = Array.from(Array(n), () => []);
    let prev = words[0];
    
    people[0].push(words[0]);
    set.add(words[0]);
    
    for(let i = 1; i < words.length; i++) {
        if(prev[prev.length - 1] !== words[i][0]) {
            return [i % n + 1, people[i % n].length + 1];
        }
        
        if(set.has(words[i])) {
            return [i % n + 1, people[i % n].length + 1];
        }
        else {
            people[i % n].push(words[i]);
            set.add(words[i]);
        }
        prev = words[i];
    }
    
    
    

    return answer;
}