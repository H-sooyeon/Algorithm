function solution(numbers) {
    let answer = [];
    
    const parseToBinary = (num) => {
        return num.toString(2);
    }
    
    const findTreeHeight = (num) => {
        const nodeCnt = num.length;
        const height = Math.ceil(Math.log2(nodeCnt + 1));
        
        return height;
    }
    
    const calCompleteBinary = (origin, height) => {
        const nodeCnt = 2 ** height - 1;
        
        return '0'.repeat(nodeCnt - origin.length) + origin;
    }
    
    const isPossibleCompleteBinary = (binary) => {
        if(binary.length === 1) return true;

        const root = Math.floor(binary.length / 2);
        if(binary[root] === '0' && binary.includes('1')) return false;
        
        const left = binary.slice(0, root);
        const right = binary.slice(root + 1);
        
        const isPossibleLeft = isPossibleCompleteBinary(left);
        const isPossibleRight = isPossibleCompleteBinary(right);
        
        if(isPossibleLeft && isPossibleRight) return true;
        return false;
    }
    
    numbers.forEach((number) => {
        const binary = parseToBinary(number);
        const treeHeight = findTreeHeight(binary);
        const completeBinary = calCompleteBinary(binary, treeHeight);
        const result = isPossibleCompleteBinary(completeBinary);
        // console.log(completeBinary);
        if(result) answer.push(1);
        else answer.push(0);
    })
    
    return answer;
}