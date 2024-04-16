function solution(n, wires) {
    let min_value = [];
    let linked_list = Array.from({length: n + 1}, () => []);
    
    // let node_max = 0;
    // let node_max_list = [];
    for(let i = 0; i < wires.length; i++) {
        let [v1, v2] = wires[i];
        linked_list[v1].push(v2);
        linked_list[v2].push(v1);
        
        // node_max = Math.max(node_max, linked_list[v1].length);
        // node_max = Math.max(node_max, linked_list[v2].length);
    }
    
    // for(let i = 1; i < linked_list.length; i++) {
    //     if(linked_list[i].length === node_max)
    //         node_max_list.push(i);
    // }
        
    let visited = new Array(n+1).fill(false);
    let set = new Set(); // 노드 세는 set
    
    const nodeCnt = (node_num) => {
        set.add(node_num);
        visited[node_num] = true;
        
        for(let node of linked_list[node_num]) {
            if(visited[node]) continue;
            nodeCnt(node);
        }
    }
    
    let node_dif = 987654321; // 끊은 노드들의 차이
    linked_list.forEach((node_max_list, idx) => {
        for(let node of node_max_list) {
            visited.fill(false);
            visited[node] = true;
        
            for(let linked_node of linked_list[node]) {
                nodeCnt(linked_node);
                node_dif = Math.min(node_dif, Math.abs(set.size - (n - set.size)));
            
                set.clear();
                visited.fill(false);
                visited[node] = true;   
            }
        }
    })
  
    
    // console.log(node_dif);
    
    return node_dif;
}