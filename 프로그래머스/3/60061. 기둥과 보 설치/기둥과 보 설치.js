function solution(n, build_frame) {
    let answer = [];
    let installFrame = [];
    
    const checkPillar = (copy, x, y) => {
        if(y === 0) return true;
        else if(copy.find(([a, b, fr]) => a===x && b===y-1 && fr === 0)) return true;
        else if(copy.find(([a, b, fr]) => a===x && b===y && fr===1)) return true;
        else if(copy.find(([a, b, fr]) => a===x-1 && b===y && fr===1)) return true;
        
        return false;
    }
    
    const checkPlate = (copy, x, y) => {
        if(copy.find(([a, b, fr]) => a===x && b===y-1 && fr===0)) return true;
        else if(copy.find(([a, b, fr]) => a===x+1 && b===y-1 && fr===0)) return true;
        else if(copy.find(([a, b, fr]) => a===x+1 && b===y && fr===1) &&
          copy.find(([a, b, fr]) => a===x-1 && b===y && fr===1)) {
            return true;
        }
        
        return false;
    }
    
    const destroyFrame = (x, y, frame) => {
        const copy = installFrame.slice();
        const idx = installFrame.findIndex(([a, b, fr]) => a===x && b===y && fr===frame);
        
        copy.splice(idx, 1);
        for(const frs of copy) {
            const [xpos, ypos, fr] = frs;
    
            if(fr) {
                if(!checkPlate(copy, xpos, ypos)) return;
            }
            else {
                if(!checkPillar(copy, xpos, ypos)) return;
            }
        }
        
        installFrame.splice(idx, 1);
    }
        
    // a: 0은 기둥, 1은 보
    for(let i = 0; i < build_frame.length; i++) {
        const [x, y, a, b] = build_frame[i];
        
        // 기둥인 경우
        if(a === 0) {
            if(b === 0) destroyFrame(x, y, 0);
            else {
                // 설치인 경우
                if(checkPillar(installFrame, x, y)) {
                    installFrame.push([x, y, 0]);
                }
            }
        }
        else {
             // 보인 경우
            if(b === 0) destroyFrame(x, y, 1);
            else {
                // 설치인 경우
                if(checkPlate(installFrame, x, y)) {
                    installFrame.push([x, y, 1]);
                }
            }
        }
    };
    
    installFrame.sort((a, b) => {
        if(a[0] === b[0] && a[1] === b[1]) {
            return a[2] - b[2];
        }
        if(a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    })
    
    return installFrame;
}