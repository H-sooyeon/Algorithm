function solution(n) {
    let answer = [];
    
    const move = (n, start, to) => {
        answer.push([start, to]);
    }
    
    const hanoi = (n, start, via, to) => {
        if(n === 1) {
            move(1, start, to);
            return;
        }
        
        hanoi(n-1, start, to, via);
        move(n, start, to);
        hanoi(n-1, via, start, to);
    }
    
    hanoi(n, 1, 2, 3);

    return answer;
}