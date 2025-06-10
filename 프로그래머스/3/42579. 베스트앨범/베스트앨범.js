function solution(genres, plays) {
    let answer = [];
    const album = {};
    const playCnt = {};
    
    genres.forEach((genre, idx) => {
        if(album[genre] === undefined) {
            playCnt[genre] = plays[idx];
            album[genre] = [[idx, plays[idx]]];
        }
        else {
            playCnt[genre] += plays[idx];
            album[genre].push([idx, plays[idx]]);
        }
    })
    
    const playCntArr = [];
    for(let [key, value] of Object.entries(playCnt)) {
        playCntArr.push([key, value]);
    }
    playCntArr.sort((a, b) => b[1] - a[1]);
    
    playCntArr.forEach(([genre, cnt]) => {
        const genrePlayList = album[genre];
        genrePlayList.sort((a, b) => b[1] - a[1]);
        
        genrePlayList.forEach((play, idx) => {
            if(idx >= 2) return;
            answer.push(play[0]);
        })
    })
    
    return answer;
}