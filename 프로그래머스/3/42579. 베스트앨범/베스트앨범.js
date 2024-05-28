function solution(genres, plays) {
    let answer = [];
    let map = new Map();
    let scores = {};
    
    for(let i = 0; i < genres.length; i++) {
        if(map.has(genres[i])) {
            let value = map.get(genres[i]);
            let score = scores[genres[i]]
            
            value.push([plays[i], i]);
            score += plays[i];
            
            map.set(genres[i], value);
            scores[genres[i]] = score;
        }
        else {
            map.set(genres[i], [[plays[i], i]]);
            scores[genres[i]] = plays[i];
        }
    }
    
    let result = [];
    for(let [key, value] of map.entries()) {
        let arr = value.sort((a, b) => b[0] - a[0]);
        result.push([arr.length, arr]);
        map.set(key, arr);
    }
    
    // console.log(map);

    const sortable = Object.entries(scores).sort(([, a], [, b]) => b - a)
    result.sort((a, b) => b[0] - a[0]);
    
    for(let i = 0; i < sortable.length; i++) {
        let key = sortable[i][0];
        let arr = map.get(key);
        
        if(arr.length < 2) answer.push(arr[0][1]);
        else {
            answer.push(arr[0][1], arr[1][1]);
        }
    }
    // console.log(sortable);
    
    return answer;
}