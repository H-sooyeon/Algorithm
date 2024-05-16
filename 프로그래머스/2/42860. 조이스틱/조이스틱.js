function solution(name) {
    let alpha = 0;
    let minMove = name.length - 1;
    
    for(let cursor = 0; cursor < name.length; cursor++) {
        let nextCursor = cursor + 1;
        while(name[nextCursor] === 'A') {
            nextCursor++;
        };
        
        const toBack = name.length - nextCursor;
        // console.log(name[nextCursor], cursor, nextCursor, minMove, cursor * 2 + toBack, toBack * 2 + cursor)
        minMove = Math.min(minMove, cursor * 2 + toBack, toBack * 2 + cursor);
        
        let code = name[cursor].charCodeAt() - 65;
        // console.log(name[cursor], code , Math.min(code - 0, 26 - code));
        alpha += Math.min(code - 0, 26 - code);
    }
    
    // console.log(minMove);
    return alpha + minMove;
}