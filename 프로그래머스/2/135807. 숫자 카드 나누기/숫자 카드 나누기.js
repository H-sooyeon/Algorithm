function solution(arrayA, arrayB) {
    const gcd = (a, b) => {
        while(b !== 0) {
            const r = a % b;
            a = b;
            b = r;
        }
        return a;
    }
    
    const getGcdForArray = (numbers) => {
        if(numbers.length === 0) return 0;
        
        return numbers.reduce((acc, cur) => gcd(acc, cur), 0);
    }
    
    const a = getGcdForArray(arrayA);
    const b = getGcdForArray(arrayB);
    
    let flagA = true;
    let flagB = true;
    for(let i = 0; i < arrayA.length; i++) {
        if(arrayA[i] % b === 0) {
            flagA = false;
            break;
        }
    }
    for(let i = 0; i < arrayB.length; i++) {
        if(arrayB[i] % a === 0) {
            flagB = false;
            break;
        }
    }
    
    if(!flagA && !flagB) return 0;
    if(flagA && flagB) {
        return Math.max(a, b);
    }
    if(flagA) {
        return b;
    }
    if(flagB) {
        return a;
    }
    
    return 0;
}