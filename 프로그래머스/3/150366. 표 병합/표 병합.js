function solution(commands) {
    let answer = [];
    const table = Array.from({length: 51}, () => Array(51));
    
    const makeKey = (row, col) => {
        return `${row},${col}`;
    }
    
    for(let i = 1; i < 51; i++) {
        for(let j = 1; j < 51; j++) {
            table[i][j] = [makeKey(i, j), null];
        }
    }
    
    const update = (command) => {
        if(command.length === 3) {
            let [r, c, value] = command;
            const key = table[Number(r)][Number(c)][0];
            
            for(let i = 1; i < 51; i++) {
                for(let j = 1; j < 51; j++) {
                    if(table[i][j][0] === key) {
                        table[i][j][1] = value;
                    }
                }
            }
        }
        else if(command.length === 2) {
            let [value1, value2] = command;
            for(let i = 1; i < 51; i++) {
                for(let j = 1; j < 51; j++) {
                    if(table[i][j][1] === value1) {
                        table[i][j][1] = value2;
                    }
                }
            }
        }
    }
    
    const merge = (command) => {
        const [r1, c1, r2, c2] = command.map(Number);
        
        const key1 = table[r1][c1][0];
        const key2 = table[r2][c2][0];
        
        let value = table[r2][c2][1];
        
        if(table[r1][c1][1] !== null) {
            value = table[r1][c1][1];
        }
        
        for(let i = 1; i < 51; i++) {
            for(let j = 1; j < 51; j++) {
                if(table[i][j][0] === key2) {
                    table[i][j][0] = key1;
                    table[i][j][1] = value;
                }
                if(table[i][j][0] === key1) {
                    table[i][j][1] = value;
                }
            }
        }
    }
    
    const unmerge = (command) => {
        const [r, c] = command.map(Number);
        const key = table[r][c][0];
        const value = table[r][c][1];
        
        for(let i = 1; i < 51; i++) {
            for(let j = 1; j < 51; j++) {
                if(table[i][j][0] === key) {
                    table[i][j][0] = makeKey(i, j);
                    table[i][j][1] = null;
                }
            }
        }
        table[r][c][1] = value;
    }
    
    commands.forEach((item) => {
        const [command, ...rest] = item.split(' ');
        
        if(command === 'UPDATE') {
            update(rest);
        }
        else if(command === 'MERGE') {
            merge(rest);
        }
        else if(command === 'UNMERGE') {
            unmerge(rest);
        }
        else if(command === 'PRINT') {
            const [r, c] = rest.map(Number);
            if(table[r][c][1] === null) {
                answer.push('EMPTY');
            } else {
                answer.push(table[r][c][1]);
            }
        }
    })
    
    return answer;
}