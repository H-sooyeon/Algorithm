function solution(skill, skill_trees) {
    let answer = 0;
    
    for(let i = 0; i < skill_trees.length; i++) {
        let skill_idx = 0;
        let flag = false;
        
        for(let j = 0; j < skill_trees[i].length; j++) {
            if(skill_trees[i][j] === skill[skill_idx]) skill_idx++;
            else if(!skill.includes(skill_trees[i][j])) continue;
            else {
                flag = true;
                break;
            }
        }
        
        if(!flag) {
            answer++;
        }
    }
    
    
    return answer;
}