function solution(user_id, banned_id) {
    let answer = 0;
    let banned_arr = Array.from(Array(banned_id.length), () => []);
    
    for(let i = 0; i < banned_id.length; i++) {
        let starPos = [];
        
        for(let j = 0; j < banned_id[i].length; j++) {
            if(banned_id[i][j] === '*') {
                starPos.push(j);
            }
        }
        
        for(let j = 0; j < user_id.length; j++) {
            let modifyUser = user_id[j].split('');
            if(starPos[starPos.length - 1] <= modifyUser.length - 1) {
                for(let k = 0; k < starPos.length; k++) {
                    modifyUser[starPos[k]] = '*';
                }
                
                modifyUser = modifyUser.join('');
                if(modifyUser === banned_id[i]) {
                    banned_arr[i].push(user_id[j]);
                }
            }
        }
    }
    
    const result = new Set();
    const dfs = (selected, depth) => {
        if(depth === banned_arr.length) {
            // console.log(selected);
            const sortSelected = [...selected].sort();
            const set = new Set(sortSelected);
            if(set.size === banned_id.length) {
                result.add(Array.from(set).join(' '));
            }
            return;
        }
        
        for(let i = 0; i < banned_arr[depth].length; i++) {
            if(selected.includes(banned_arr[depth][i])) continue;
            
            selected.push(banned_arr[depth][i]);
            dfs(selected, depth + 1);
            selected.pop();
        }
    }
    
    for(let i = 0; i < banned_arr[0].length; i++) {
        dfs([banned_arr[0][i]], 1);
    }
            
    return result.size;
}