function solution(arrayA, arrayB) {
    let min1 = 987654321;
    let min2 = 987654321;
    
    for(let i = 0; i < arrayA.length; i++) {
        min1 = Math.min(min1, arrayA[i]);
        min2 = Math.min(min2, arrayB[i]);
    }
    
    const getDivisors = (num) => {
	    const divisors = [];
	    for(let i = 1; i <= Math.sqrt(num); i++) {
		    if(num % i === 0) {
                if(i !== 1)
			        divisors.push(i);
			    if(num / i !== i) divisors.push(num / i);
		    }
	    }
        return divisors;
    }
    
    let min1_measure = getDivisors(min1);
    let min2_measure = getDivisors(min2);
    
    let min1_arr = min1_measure.filter(x => !min2_measure.includes(x));
    let min2_arr = min2_measure.filter(x => !min1_measure.includes(x));
    
    min1_arr.sort((a, b) => b - a);
    min2_arr.sort((a, b) => b - a);
    
    let result1 = 0;
    for(let i = 0; i < min1_arr.length; i++) {
        let cnt = 0;
        for(let j = 0; j < arrayA.length; j++) {
            if(arrayA[j] % min1_arr[i] === 0) {
                if(arrayB[j] % min1_arr[i] !== 0) {
                    cnt++;
                }
            } else break;
        }
        if(cnt === arrayA.length) {
            result1 = min1_arr[i];
            break;
        }
        cnt = 0;
    }
    
    let result2 = 0;
    for(let i = 0; i < min2_arr.length; i++) {
        let cnt = 0;
        for(let j = 0; j < arrayA.length; j++) {
            if(arrayB[j] % min2_arr[i] === 0) {
                if(arrayA[j] % min2_arr[i] !== 0) {
                    cnt++;
                }
            } else break;
        }
        if(cnt === arrayA.length) {
            result2 = min2_arr[i];
            break;
        }
        cnt = 0;
    }
        
    return Math.max(result1, result2);
}