function solution(N, road, K) {
    let answer = 0;
    let arr = Array.from({length: N + 1}, () => Array(N + 1).fill(987654321));
    
    for(let i = 0; i < road.length; i++) {
        let [start, end, cost] = road[i];
        
        if(arr[start][end] > cost) {
            arr[start][end] = cost;
            arr[end][start] = cost;
        }
    }
    
    for(let k = 1; k <= N; k++) {
        for(let a = 1; a <= N; a++) {
            for(let b = 1; b <= N; b++) {
                arr[a][b] = Math.min(arr[a][k] + arr[k][b], arr[a][b]);
            }
        }
    }
    
    for(let i = 1; i <= N; i++) arr[i][i] = 0;
    
    for(let i = 1; i <= N; i++) {
        if(arr[1][i] <= K) answer++;
    }
    

    return answer;
}