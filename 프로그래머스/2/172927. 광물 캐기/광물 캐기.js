function solution(picks, minerals) {
    // 다이아몬드, 철, 돌 순서 picks
    let answer = 0;
    let Fati = {
        'diamond': {'diamond': 1, 'iron': 1, 'stone': 1},
        'iron': {'diamond': 5, 'iron': 1, 'stone': 1},
        'stone': {'diamond': 25, 'iron': 5, 'stone': 1},
    }
    let key = Object.getOwnPropertyNames(Fati);
    let picks_sum = picks.reduce((acc, cur) => acc + cur, 0);
    
    let minerals_arr = [];
    let tmp = [];
    let sum = 0;
    for(let i = 0; i < minerals.length; i++) {
        if(tmp.length === 5) {
            minerals_arr.push([sum, tmp]);
            tmp = [];
            sum = 0;
        }
        
        tmp.push(minerals[i]);
        sum += Fati['stone'][minerals[i]];
    }
    minerals_arr.push([sum, tmp]);
    
    if(picks_sum * 5 < minerals.length)
        minerals_arr = minerals_arr.slice(0, picks_sum);
    
    minerals_arr.sort((a, b) => b[0] - a[0]);

    let pick_idx = 0;
    let minerals_idx = 0;
    while(pick_idx < picks.length && minerals_idx < minerals_arr.length) {
        if(picks[pick_idx] === 0) {
            pick_idx++;
            continue;
        }
        
        let size = minerals_arr[minerals_idx][1].length;
        for(let i = 0; i < size; i++) {
            // console.log(Fati[key[pick_idx]], " | ", minerals_arr[minerals_idx][1][i]);
            answer += Fati[key[pick_idx]][minerals_arr[minerals_idx][1][i]];
        }
        picks[pick_idx]--;
        
        minerals_idx++;
    }
    
    return answer;
}