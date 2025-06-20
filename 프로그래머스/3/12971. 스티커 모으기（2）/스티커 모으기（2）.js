function solution(sticker) {
    const len = sticker.length;
    const firstStart = new Array(len).fill(0);
    const secondStart = new Array(len).fill(0);
    
    if(sticker.length <= 2) {
        if(sticker.length === 1) return sticker[0];
        return Math.max(sticker[0], sticker[1]);
    }
    
    firstStart[0] = sticker[0];
    firstStart[1] = sticker[0];
    
    secondStart[1] = sticker[1];
    secondStart[2] = sticker[1];
    
    // firstStart
    for(let i = 2; i < len - 1; i++) {
        firstStart[i] = Math.max(firstStart[i-1], firstStart[i-2] + sticker[i]);
    }
    
    // secondStart
    for(let i = 2; i < len; i++) {
        secondStart[i] = Math.max(secondStart[i-1], secondStart[i-2] + sticker[i]);
    }

    return Math.max(firstStart[len-2], secondStart[len-1]);
}