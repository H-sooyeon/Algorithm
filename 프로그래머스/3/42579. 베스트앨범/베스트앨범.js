function solution(genres, plays) {
    let answer = [];
    
    // map으로 genre별 얼마나 재생됐는지 확인
    // map으로 genre별 [고유 번호, 재생 횟수]를 묶음
    // 내림차순으로 정렬해 genre별 재생 횟수가 많은 것부터 탐색
    // genre별 [고유 번호, 재생 횟수] 리스트를 정렬해 재생 횟수가 높은 것부터 차례로 최대 2개만 저장
    
    const genrePlayMap = new Map();
    const genreMap = new Map();
    
    for(let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];
        
        if(!genrePlayMap.has(genre)) genrePlayMap.set(genre, 0);
        if(!genreMap.has(genre)) genreMap.set(genre, []);
        
        genrePlayMap.set(genre, genrePlayMap.get(genre) + play);
        const genreArr = genreMap.get(genre);
        genreArr.push([i, play]);
        genreMap.set(genre, genreArr);
    }
    
    const sortedGenreMap = new Map([...genrePlayMap].sort((a, b) => b[1] - a[1]));
    
    for(let [key, value] of sortedGenreMap) {
        let list = genreMap.get(key);
        
        if(list.length === 1) answer.push(list[0][0]);
        else {
            list = list.sort((a, b) => {
                if(b[1] === a[1]) return a[0] - b[0];
                return b[1] - a[1]
            });
            answer.push(list[0][0], list[1][0]);
        }
    }
    
    return answer;
}