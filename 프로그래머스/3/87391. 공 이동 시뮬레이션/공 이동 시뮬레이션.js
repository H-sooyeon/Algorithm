function solution(n, m, x, y, queries) {
    const COMMAND = {
        LEFT: 0,
        RIGHT: 1,
        UP: 2,
        DOWN: 3,
    }
    
    // n행, m열 -> y:n, m:x, x행 y열 -> x:y, y:x 로 변경
    let arriveX = BigInt(y);
    let arriveY = BigInt(x);
    n = BigInt(n);
    m = BigInt(m);
    
    let minX = arriveX, maxX = arriveX;
    let minY = arriveY, maxY = arriveY;
    
    for(let i = queries.length - 1; i >= 0; i--) {
        let [command, distance] = queries[i];
        const move = BigInt(distance);
        
        // 벽에 붙어있는 경우와 붙어있지 않은 경우
        if(command === COMMAND.LEFT) {
            if(minX > 0n) {
                minX += move;
            }
            maxX = maxX + move < m ? maxX + move : m - 1n;
        }
        else if(command === COMMAND.RIGHT) {
            if(maxX < m - 1n) {
                maxX -= move;
            }
            minX = minX - move >= 0n ? minX - move : 0n;
        }
        else if(command === COMMAND.UP) {
            if(minY > 0n) {
                minY += move;
            }
            maxY = maxY + move < n ? maxY + move : n - 1n;
        }
        else if(command === COMMAND.DOWN) {
            if(maxY < n - 1n) {
                maxY -= move;
            }
            minY = minY - move >= 0n ? minY - move : 0n;
        }
        
        if(minX > maxX || minY > maxY) return 0;
    }
    
    if(minX > maxX || minY > maxY) return 0;
    
    return (maxX - minX + 1n) * (maxY - minY + 1n);
}