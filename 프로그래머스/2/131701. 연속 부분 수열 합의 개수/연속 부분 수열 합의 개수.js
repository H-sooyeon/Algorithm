function solution(elements) {
    let set = new Set();
    
    let length = elements.length;
    for(let i = 1; i <= length; i++) {
        let sum = 0;
        for(let j = 0; j < length; j++) {
            if(j === 0) {
                for(let k = 0; k < i; k++) {
                    sum += elements[k];
                }
            }
            else {
                sum -= elements[j - 1];
                sum += elements[(i + j - 1) % length];
            }
            set.add(sum);
        }
    }
    
    return set.size;
}