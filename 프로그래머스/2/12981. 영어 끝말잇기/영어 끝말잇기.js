function solution(n, words) {
    let answer = [0, 0];
    
    let set = new Set();
    let people = Array.from(Array(n), () => []);
    
    let words_idx = 1;
    let flag = false;
    let people_idx = 1;
    people[0].push(words[0]);
    set.add(words[0]);
    while(words_idx < words.length) {
        let word = words[words_idx];
        // 문자가 안맞을 때
        if(words[words_idx - 1][words[words_idx - 1].length - 1] !== word[0]) {
            answer = [people_idx + 1, people[people_idx].length + 1];
            flag = true;
            break;
        }
        // 단어 중복일 때
        if(set.has(word)) {
            answer = [people_idx + 1, people[people_idx].length + 1];
            flag = true;
            break;
        } else {
            people[people_idx].push(words[words_idx]);
            set.add(word);
        }
        words_idx++;
        people_idx = (people_idx + 1) % n;
    
        if(flag) break;
    }

    return answer;
}