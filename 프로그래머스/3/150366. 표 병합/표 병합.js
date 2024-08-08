function solution(commands) {
    let answer = [];
    let table = Array.from({length: 51}, () => Array.from({length: 51}, () => ["", undefined]));

    const getKey = (r, c) => {
        return `${r},${c}`;
    }
    
    for(let i = 1; i < 51; i++) {
        for(let j = 1; j < 51; j++) {
            table[i][j][1] = getKey(i, j);
        }
    }
    
    const merging = (r1, c1, r2, c2) => {
        // 같은 곳이라면 무시
        if(Math.abs(r1 - r2) + Math.abs(c1 - c2) === 0) {
            return;
        }
        
        let value = "";
        const r1c1key = table[r1][c1][1];
        const r2c2key = table[r2][c2][1];
        
        if(table[r2][c2][0] !== "") {
            value = table[r2][c2][0];
        }
        
        if(table[r1][c1][0] !== "") {
            value = table[r1][c1][0];
        }
        
        for(let i = 1; i < 51; i++) {
            for(let j = 1; j < 51; j++) {
                if(table[i][j][1] === r1c1key) {
                    table[i][j][0] = value;
                }
                if(table[i][j][1] === r2c2key) {
                    table[i][j][0] = value;
                    table[i][j][1] = r1c1key;
                }
            }
        }
    }
    
    // UPDATE, MERGE, UNMERGE PRINT
    commands.forEach((command, idx) => {
        const [keyword, ...orders] = command.split(' ');
        
        switch(keyword) {
            case 'UPDATE':
                if(orders.length === 3) {
                    const [r, c, value] = orders;
                    const mergeKey = table[r][c][1];
                    
                    for(let i = 1; i < 51; i++) {
                        for(let j = 1; j < 51; j++) {
                            if(table[i][j][1] === mergeKey) {
                                table[i][j][0] = value;
                            }
                        }
                    }
                    
                    table[+r][+c][0] = value;
                }
                else {
                    const [value1, value2] = orders;
                    
                    for(let i = 1; i < 51; i++) {
                        for(let j = 1; j < 51; j++) {
                            if(table[i][j][0] === value1) {
                                table[i][j][0] = value2;
                            }
                        }
                    }
                }
                break;
            case 'MERGE':
                const [r1, c1, r2, c2] = orders.map(Number);
                merging(r1, c1, r2, c2);
                break;
            case 'UNMERGE':
                const [r, c] = orders.map(Number);
                const mergeKey = table[r][c][1];
                const mergeValue = table[r][c][0];
                
                for(let i = 1; i < 51; i++) {
                    for(let j = 1; j < 51; j++) {
                        if(table[i][j][1] === mergeKey) {
                            table[i][j][0] = "";
                            table[i][j][1] = getKey(i, j);
                        }
                    }
                }
                
                table[r][c][0] = mergeValue;
                break;
            case 'PRINT':
                const [printR, printC] = orders.map(Number);
                
                if(table[printR][printC][0] === "") {
                    answer.push('EMPTY');
                }
                else {
                    answer.push(table[printR][printC][0]);
                }
                break;
            default:
                break;
        }
    })
    
    return answer;
}