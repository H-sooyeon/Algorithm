function solution(sticker) {
    let len = sticker.length + 2;
    let dp1 = new Array(len).fill(0);
    let dp2 = new Array(len).fill(0);
    
    if(sticker.length === 1) return sticker[0];
    
    for(let i = 2; i < len-1; i++) {
        dp1[i] = Math.max(dp1[i-1], dp1[i-2] + sticker[i-2]);
    }

    for(let i = 3; i < len; i++) {
        dp2[i] = Math.max(dp2[i-1], dp2[i-2] + sticker[i-2]);
    }

    return Math.max(dp1[len - 2], dp2[len - 1]);
}