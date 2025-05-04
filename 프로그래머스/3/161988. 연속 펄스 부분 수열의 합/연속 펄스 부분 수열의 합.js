function solution(sequence) {
    let answer = 0;
    
    const minusSequence = sequence.map((value, idx) => {
        if(idx % 2 === 0) return value * -1;
        return value;
    })
    
    const plusSequence = sequence.map((value, idx) => {
        if(idx % 2 === 0) return value;
        return value * -1;
    })
    
    for(let i = 1; i < sequence.length; i++) {
        minusSequence[i] = minusSequence[i-1] + minusSequence[i];
        plusSequence[i] = plusSequence[i-1] + plusSequence[i];
    }
        
    const findMaxValue = (seq) => {        
        let minIdx = 0;
        let maxIdx = 0;
        
        let maxValue = seq[0];
        for(let i = 1; i < seq.length; i++) {
            maxIdx = i;
            if(seq[i] < seq[minIdx]) {
                minIdx = i;
                maxValue = Math.max(maxValue, seq[minIdx]);
                continue;
            }
            
            maxValue = Math.max(maxValue, seq[maxIdx] - seq[minIdx], seq[i]);
        }
        
        return maxValue;
    }
    
    const minusMaxValue = findMaxValue(minusSequence);
    const plusMaxValue = findMaxValue(plusSequence);
        
    return Math.max(minusMaxValue, plusMaxValue);
}