// UPDATE r c value
// UPDATE value1 value2
// MERGE r1 c1 r2 c2
// UNMERGE r c
// PRINT r c
function solution(commands) {
    let answer = [];
    
    function Node() {
        this.group = new Set();
        this.value = null;
    }
    
    const graph = Array.from({length: 51}, () => Array.from({length: 51}, () => new Node()));
    
    commands.forEach((command) => {
        const line = command.split(' ');
        const cd = line[0];
        
        if(cd === 'UPDATE') {
            if(line.length === 4) { // UPDATE r c value
                let [, r, c, value] = line;
                const group = graph[r][c].group;
                graph[r][c].value = value;
                
                for(let cell of group) {
                    const [y, x] = cell.split(',').map(Number);
                    graph[y][x].value = value;
                }
            }
            else { // UPDATE value1 value2
                const [, value1, value2] = line;
                for(let i = 0; i < 51; i++) {
                    for(let j = 0; j < 51; j++) {
                        if(graph[i][j].value === value1) {
                            graph[i][j].value = value2;
                        }
                    }
                }
            }
        }
        else if(cd === 'MERGE') {
            const [, r1, c1, r2, c2] = line;
            
            const group = new Set([...graph[r1][c1].group, ...graph[r2][c2].group, `${r1},${c1}`, `${r2},${c2}`]);
            let value = graph[r1][c1].value ? graph[r1][c1].value : graph[r2][c2].value;
            
            for(let cell of group) {
                const [y, x] = cell.split(',').map(Number);
                graph[y][x].value = value;
                graph[y][x].group = group;
            }
        }
        else if(cd === 'UNMERGE') {
            const [, r, c] = line;
            
            const group = graph[r][c].group;
            const value = graph[r][c].value;
            
            for(let cell of group) {
                const [y, x] = cell.split(',').map(Number);
                graph[y][x].group = [];
                graph[y][x].value = null;
            }
            
            graph[r][c].value = value;
        }
        else if(cd === 'PRINT') {
            const [, r, c] = line;
            
            if(graph[r][c].value) {
                answer.push(graph[r][c].value);
            } else {
                answer.push('EMPTY');
            }
        }
    })
    
    return answer;
}