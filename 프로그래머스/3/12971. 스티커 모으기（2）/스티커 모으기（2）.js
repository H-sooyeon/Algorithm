function solution(sticker) {
    let answer = 0;
    let dp1 = new Array(sticker.length).fill(0);
    let dp2 = new Array(sticker.length).fill(0);
    
    if(sticker.length === 1) return sticker[0];
    
    // 마지막 인덱스 불포함
    dp1[0] = sticker[0];
    dp1[1] = sticker[0];
    for(let i = 2; i < sticker.length; i++) {
        dp1[i] = Math.max(dp1[i-2] + sticker[i], dp1[i-1]);
    }
    
    console.log(dp1);
    
    // 마지막 인덱스 포함
    dp2[1] = sticker[1];
    for(let i = 2; i < sticker.length; i++) {
        dp2[i] = Math.max(dp2[i - 2] + sticker[i], dp2[i-1]);
    }
    
    console.log(dp2);
    answer = Math.max(dp1[sticker.length - 2], dp2[sticker.length - 1]);
    
    return answer;
}