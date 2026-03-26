function solution(p) {    
    const splitUAndV = (value) => {
        let left = 0; // '('
        let right = 0; // ')'
        
        for(let i = 0; i < value.length; i++) {
            if(value[i] === '(') left += 1;
            if(value[i] === ')') right += 1;
            
            if(left === right) {
                const u = value.slice(0, i + 1);
                const v = value.slice(i + 1);
                return [u, v];
            }
        }
        return [value, ''];
    }
    
    const isRightStr = (value) => {
        const stack = [];
        for(let i = 0; i < value.length; i++) {
            if(stack.length) {
                const top = stack[stack.length - 1];
                
                if(top === ')' && value[i] === '(') return false;
                if(top === '(' && value[i] === ')') {
                    stack.pop();
                    continue;
                }
            }
            stack.push(value[i]);
        }
        
        if(stack.length) return false;
        return true;
    }
    
    const makeRightStr = (value) => {
        // 문자열 w를 두 균형잡힌 괄호 문자열 u, v로 분리한다.
        if(value === '') return '';
        
        let [u, v] = splitUAndV(value);
        
        // 문자열 u가 올바른 괄호 문자열인지 확인
        if(isRightStr(u)) {
            // return;
            return u + makeRightStr(v);
        }
        else {
            // return;
            let tmp = '(';
            tmp += makeRightStr(v);
            tmp += ')';
        
            let convertedU = '';
            u = u.slice(1, -1);
            for(let i = 0; i < u.length; i++) {
                if(u[i] === '(') convertedU += ')';
                else convertedU += '(';
            }
            tmp += convertedU;
            return tmp;
        }
    }
        
    return makeRightStr(p);
}