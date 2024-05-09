function solution(arrayA, arrayB) {
    let answer = 0;
    
    let minA = 987654321;
    let minB = 987654321;
    
    for(let i = 0; i < arrayA.length; i++) {
        minA = Math.min(arrayA[i], minA);
        minB = Math.min(arrayB[i], minB);
    }
    
    // 약수 구하기
    const getMeasure = (num) => {
        let result = [];
        for(let i = 1; i <= Math.sqrt(num); i++) {
            if(num % i === 0) {
                if(i !== 1) result.push(i);
                if(num / i !== i) result.push(num / i);
            }
        }
        
        return result;
    }
    
    let measureA = getMeasure(minA);
    let measureB = getMeasure(minB);
    
    let resultA = measureA.filter((v) => !measureB.includes(v));
    let resultB = measureB.filter((v) => !measureA.includes(v));
        
    resultA.sort((a, b) => a - b);
    resultB.sort((a, b) => a - b);
    
    let answerA = 0;
    let answerB = 0;
    
    for(let i = 0; i < resultA.length; i++) {
        let cntA = 0;
        for(let j = 0; j < arrayA.length; j++) {            
            if(arrayA[j] % resultA[i] === 0) {
                if(arrayB[j] % resultA[i] !== 0)
                    cntA++;
            }
        }
        
        if(cntA === arrayA.length) 
            answerA = resultA[i];
    }
    
    for(let i = 0; i < resultB.length; i++) {
        let cntB = 0;
        for(let j = 0; j < arrayB.length; j++) {            
            if(arrayB[j] % resultB[i] === 0) {
                if(arrayA[j] % resultB[i] !== 0)
                    cntB++;
            }
        }
        
        if(cntB === arrayB.length) 
            answerB = resultB[i];
    }
    
    return Math.max(answerA, answerB);
}