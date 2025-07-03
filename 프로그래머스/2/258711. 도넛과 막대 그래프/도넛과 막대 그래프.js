// 생성한 정점의 번호
// 도넛 모양 그래프의 수, 막대 모양 그래프의 수, 8자 모양 그래프의 수 구하기
function solution(edges) {
    let answer = [0, 0, 0, 0];
    let maxNode = 0;
    const graph = {};
    
    edges.forEach(([a, b]) => {
        if(!graph[a]) {
            graph[a] = [0, 0]; // in, out
        }
        if(!graph[b]) {
            graph[b] = [0, 0]; // in, out
        }
        
        graph[a][1] += 1;
        graph[b][0] += 1;
    })
    
    const keys = Object.keys(graph);
    maxNode = keys.length;
    
    // indegree가 0인 노드를 기준으로 진출 노드가 많은 노드가 생성한 노드
    for(let key in graph) {
        if(graph[key][0] === 0 && graph[key][1] >= 2) {
            answer[0] = Number(key);
        }
    }
    
    for(const [a, b] of edges) {
        if(a !== answer[0]) continue;
        graph[b][0] -= 1;
    }
    
    const total = graph[answer[0]][1];
    for(const key in graph) {
        if(key === answer[0]) continue;
        
        if(graph[key][0] === 2 && graph[key][1] === 2) {
            // 8자 모양
            answer[3] += 1;
        }
        else if(graph[key][0] === 0 && graph[key][1] === 0) {
            // 막대 모양 그래프 (노드가 하나인)
            answer[2] += 1;
        }
        else if(graph[key][0] === 0 && graph[key][1] === 1) {
            // 막대 모양 그래프 (시작)
            answer[2] += 1;
        }
    }
    
    answer[1] = total - (answer[2] + answer[3]);
    
    return answer;
}