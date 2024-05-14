function solution(cards) {
    let answer = 1;
    let visited = new Array(cards.length).fill(false);
    
        let idx = [];
        for(let i = 0; i < cards.length; i++) {
            let start = i + 1;
            let cnt = 0;
            let card = [];
            while(!visited[start - 1]) {
                card.push(start - 1);
                cnt++;
                visited[start - 1] = true;
                start = cards[start - 1];
                
            }
            if(card.length)
                idx.push([start - 1, card, cnt]);
        }
    
        idx.sort((a, b) => b[b.length - 1] - a[a.length - 1]);
    
    if(idx.length === 1) {
        return 0;
    } else {
        answer = idx[0][2] * idx[1][2];
    }
    
    return answer;
}