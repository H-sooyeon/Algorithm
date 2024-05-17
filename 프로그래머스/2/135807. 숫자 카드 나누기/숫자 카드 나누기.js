function solution(arrayA, arrayB) {
    let answer = 0;
    let minA = 0;
    let minB = 0;
    
    for(let i = 0; i < arrayA.length; i++) {
        minA = Math.max(arrayA[i], minA);
        minB = Math.max(arrayB[i], minB);
    }

    
    let measureA = [];
    let measureB = [];
    
    const getMeasure = (num) => {
        let result = [];
        for(let i = 1; i <= Math.sqrt(num); i++) {
            if(num % i === 0) {
                if(i !== 1)
                    result.push(i);
                if(num / i !== i) {
                    result.push(num / i);
                }
            }
        }
        return result;
    }
    
    measureA = getMeasure(minA);
    measureB = getMeasure(minB);
        
    let filterA = measureA.filter((measure) => !measureB.includes(measure));
    let filterB = measureB.filter((measure) => !measureA.includes(measure));
        
    for(let i = 0; i < filterA.length; i++) {
        let flag = false;
        for(let j = 0; j < arrayA.length; j++) {
            if(arrayA[j] % filterA[i]) {
                flag = true;
            }
            
            if(arrayB[j] % filterA[i] === 0) {
                flag = true
            }
        }
        
        if(!flag) answer = Math.max(filterA[i], answer);
    }
    
        for(let i = 0; i < filterB.length; i++) {
        let flag = false;
        for(let j = 0; j < arrayB.length; j++) {
            if(arrayB[j] % filterB[i]) {
                flag = true;
            }
            
            if(arrayA[j] % filterB[i] === 0) {
                flag = true
            }
        }
        
        if(!flag) answer = Math.max(filterB[i], answer);
    }
    
    return answer;
}