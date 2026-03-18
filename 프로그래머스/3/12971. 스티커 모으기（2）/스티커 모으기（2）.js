// sticker를 하나 더 이어붙여 원형 모양 스티커 계산을 더 쉽게 함
// dp로 어떤걸 뜯을 것인지 판단 dp[i] = max(dp[i-2] + sticker[i], dp[i-1])
function solution(sticker) {
    const firstDp = new Array(sticker.length).fill(0); // 첫 인덱스 뜯음
    const secondDp = new Array(sticker.length).fill(0);// 첫 인덱스 뜯지 않음
    const lastIdx = sticker.length - 1;
    
    if(sticker.length === 1) return sticker[0];
    if(sticker.length === 2) return Math.max(sticker[0], sticker[1]);
    
    firstDp[0] = sticker[0];
    firstDp[1] = sticker[0];
    secondDp[1] = sticker[1];
    for(let i = 2; i < sticker.length - 1; i++) {
        firstDp[i] = Math.max(firstDp[i-2] + sticker[i], firstDp[i-1]);
        secondDp[i] = Math.max(secondDp[i-2] + sticker[i], secondDp[i-1]);
    }
    
    secondDp[lastIdx] = Math.max(secondDp[lastIdx-2] + sticker[lastIdx], secondDp[lastIdx-1])

    return Math.max(secondDp[lastIdx], firstDp[lastIdx - 1]);
}