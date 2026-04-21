function solution(cards) {
    const visited = new Array(cards.length).fill(false);
    
    const findLoop = (start) => {
        const loop = new Set();
        
        let cur = start;
        visited[cur] = true;
        
        while(!loop.has(cur)) {
            loop.add(cur);
            let next = cards[cur] - 1;
            if(visited[next]) break;
            cur = next;
            visited[next] = true;
        }
        
        return loop.size;
    }
    
    let sizes = [];
    for(let i = 0; i < cards.length; i++) {
        if(visited[i]) continue;
        sizes.push(findLoop(i));
    }
    
    sizes.sort((a, b) => b - a);
    
    
    // console.log(sizes);
    if(sizes.length === 1) return 0;
    
    return sizes[0] * sizes[1];
}