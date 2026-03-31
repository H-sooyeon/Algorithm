// picks: [dia, iron, stone]
// 우선 백트래킹으로 구현
function solution(picks, minerals) {
    let answer = Number.MAX_SAFE_INTEGER;
    const fatigueDashboard = {
        dia: {
            diamond: 1,
            iron: 1,
            stone: 1,
        },
        iron: {
            diamond: 5,
            iron: 1,
            stone: 1,
        },
        stone: {
            diamond: 25,
            iron: 5,
            stone: 1
        }
    }
    
    const dfs = (dia, iron, stone, fatigue, curIdx) => {
        if((dia <= 0 && iron <= 0 && stone <= 0) || curIdx >= minerals.length) {
            answer = Math.min(answer, fatigue);
            return;
        }
        
        // dia 사용
        if(dia > 0) {
            let diaFatigue = fatigue;
            for(let i = curIdx; i < Math.min(minerals.length, curIdx + 5); i++) {
                diaFatigue += fatigueDashboard['dia'][minerals[i]];
            }
            dfs(dia - 1, iron, stone, diaFatigue, Math.min(minerals.length, curIdx + 5));
        }

        // iron 사용
        if(iron > 0) {
            let ironFatigue = fatigue;
            for(let i = curIdx; i < Math.min(minerals.length, curIdx + 5); i++) {
                ironFatigue += fatigueDashboard['iron'][minerals[i]];
            }
            dfs(dia, iron - 1, stone, ironFatigue, Math.min(minerals.length, curIdx + 5));
        }
        
        // stone 사용
        if(stone > 0) {
            let stoneFatigue = fatigue;
            for(let i = curIdx; i < Math.min(minerals.length, curIdx + 5); i++) {
                stoneFatigue += fatigueDashboard['stone'][minerals[i]];
            }
            dfs(dia, iron, stone - 1, stoneFatigue, Math.min(minerals.length, curIdx + 5));
        }
    }
    
    dfs(picks[0], picks[1], picks[2], 0, 0);
    
    return answer;
}