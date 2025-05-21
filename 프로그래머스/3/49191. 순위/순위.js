function solution(n, results) {
    let answer = 0;
    const playerList = new Array(n + 1);
    
    function Player (id, won, lost) {
        this.won = won;
        this.lost = lost;
        this.id = id;
    }
        
    for(let i = 1; i <= n; i++) {
        playerList[i] = new Player(i, new Set(), new Set());
    }
    
    results.forEach((result) => {
        const [won, loser] = result;
        playerList[won].won.add(loser);
        playerList[loser].lost.add(won);
    })
    
    for(let i = 1; i <= n; i++) {
        const player = playerList[i];
        
        player.won.forEach((won) => {
            const loser = playerList[won];
            loser.lost = new Set([...loser.lost, ...player.lost]);
        })
        
        player.lost.forEach((lost) => {
            const winner = playerList[lost];
            winner.won = new Set([...winner.won, ...player.won]);
        })
    }
    
    answer = playerList.filter((player, idx) => player.won.size + player.lost.size === n - 1).length;
    
    return answer;
}