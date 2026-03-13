function solution(skill, skill_trees) {
    let answer = 0;
    const map = new Map();
    const base = 'A'.charCodeAt(0);
    
    for(let i = 1; i < skill.length; i++) {
        const alpha = skill[i];
        map.set(alpha, skill[i-1]);
    }
    
    for(let tree of skill_trees) {
        const check = new Array(27).fill(false);
        let flag = true;
        
        for(let i = 0; i < tree.length; i++) {
            if(map.has(tree[i])) {
                const prev = map.get(tree[i]);
                
                if(!check[prev.charCodeAt(0) - base]) {
                    flag = false;
                    break;
                }
                check[tree[i].charCodeAt(0) - base] = true;
            }
            else check[tree[i].charCodeAt(0) - base] = true;
        }
        
        if(flag) answer += 1;
    }
    
    return answer;
}