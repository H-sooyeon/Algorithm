function solution(n, weak, dist) {
    let answer = 987654321;
    let arr = [];
    let permutation_arr = [];
    let permutation_list = [];
    let visited = new Array(dist.length).fill(false);
    dist.sort((a, b) => a - b);
    
    for(let i = 0; i < weak.length; i++) {
        arr.push(weak[i]);
    }
    
    for(let i = 0; i < weak.length; i++) {
        arr.push(weak[i] + n);
    }
    
    for(let i = 0; i < dist.length; i++) {
        permutation_arr.push(dist[i]);
    }
    
    const dfs = (depth, selected) => {
        if(depth === dist.length) {
            let list = [];
            for(let i of selected) list.push(permutation_arr[i]);
            permutation_list.push(list);
            
            return;
        }
        
        for(let i = 0; i < permutation_arr.length; i++) {
            if(visited[i]) continue;
            
            selected.push(i);
            visited[i] = true;
            dfs(depth + 1, selected);
            selected.pop();
            visited[i] = false;
        }
    }
    
    dfs(0, []);
    
    const search = (dist) => {
        
        for(let t = 0; t < weak.length; t++) {
        let cnt = 0;
        
        let dist_idx = dist.length - 1;
        let sum = arr[t] + dist[dist_idx];
        let idx = t;
        
        let dist_list = [dist[dist_idx]];
        while(true) {
            if(dist_idx < 0) {
                break;
            }
            
            if(cnt === weak.length) {
                answer = Math.min(dist_list.length, answer);
                break;
            }
            
            if(sum < arr[idx]) {
                dist_idx--;
                dist_list.push(dist[dist_idx]);
                sum = arr[t + cnt] + dist[dist_idx];
            }
            
            idx++;
            cnt++;
        }
    }
    }
        
    for(let i = 0; i < permutation_list.length; i++) {
        search(permutation_list[i]);
    }
    
    if(answer === 987654321) return -1;
    
    return answer;
}