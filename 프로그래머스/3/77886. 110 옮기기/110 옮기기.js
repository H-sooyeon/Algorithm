function solution(s) {
    let answer = [];
    const removed110 = new Array(s.length);
    const cnt110 = new Array(s.length).fill(0);
    
    const is110 = (stack) => {
        const len = stack.length;
        if(stack[len-1] === '0' && stack[len-2] === '1' && stack[len-3] === '1') {
            return true;
        }
        return false;
    }
    
    const sortWith110 = (item, cnt) => {
        const repeat110 = '110'.repeat(cnt);
        for(let i = item.length - 1; i >= 0; i--) {
            if(item[i] === '0') {
                const prev = item.slice(0, i+1);
                const next = item.slice(i+1);
                
                return prev + repeat110 + next;
            }
        }
        if(repeat110.length > 0) {
            return repeat110 + item;
        }
        return item;
    }
    
    // 110 뽑기
    s.forEach((strItem, idx) => {
        let stack = [];
        let copyItem = strItem.split('');
        
        let itemIdx = 0;
        while(itemIdx <= copyItem.length) {
            stack.push(copyItem[itemIdx]);
            
            while(stack.length >= 3 && is110(stack)) {
                for(let i = 0; i < 3; i++) {
                    stack.pop();
                }
                cnt110[idx] += 1;
            }
            itemIdx += 1;
        }
        
        removed110[idx] = stack.join('');
    })

    removed110.forEach((item, idx) => {
        answer.push(sortWith110(item, cnt110[idx]));
    })
    
    return answer;
}