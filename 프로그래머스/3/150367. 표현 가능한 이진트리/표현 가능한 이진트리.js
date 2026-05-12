// 서브 트리의 루트가 0이면 이진 트리로 표현할 수 없음
// 높이 = log2(노드개수 + 1)
// 노드개수 = 2^높이 - 1
function solution(numbers) {
    let answer = [];
    
    const binary = numbers.map((number) => {
        let initial = number.toString(2);
        const height = Math.ceil(Math.log2(initial.length + 1));
        const nodeCnt = Math.pow(2, height) - 1;
        
        const diff = nodeCnt - initial.length;
        if(diff > 0) initial = '0'.repeat(diff) + initial;
        
        return initial;
    });
    
    // console.log(binary);
    // 루트 = binary의 가운데 값
    // 재귀 함수로 서브 트리의 루트가 0인지를 탐색
    const recursion = (sub) => {
        if(sub.length === 1) return true;
        
        const root = Math.floor(sub.length / 2);
        const leftSub = sub.slice(0, root);
        const rightSub = sub.slice(root + 1);
        
        if(sub[root] === '0') {
            if(leftSub.includes('1') || rightSub.includes('1')) return false;
            return true;
        }
        
        const left = recursion(leftSub);
        const right = recursion(rightSub);
        
        if(left && right) return true;
        return false;
    }
    
    for(let item of binary) {
        if(item.length === 1) {
            if(item === '0') answer.push(0);
            else answer.push(1);
            
            continue;
        }
        
        if(recursion(item)) answer.push(1);
        else answer.push(0);
    }
    
    return answer;
}