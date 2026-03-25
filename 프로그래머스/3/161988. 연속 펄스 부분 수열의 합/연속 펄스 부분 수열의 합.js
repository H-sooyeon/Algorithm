function solution(sequence) {
    const prefix = [0];
    
    let pulse = 1;
    for(let i = 0; i < sequence.length; i++) {
        prefix.push(prefix[i] + sequence[i] * pulse);
        pulse *= -1;
    }
    
    let minVal = prefix[0];
    let maxVal = prefix[0];
    for(let i = 0; i < prefix.length; i++) {
        if(minVal > prefix[i]) minVal = prefix[i];
        if(maxVal < prefix[i]) maxVal = prefix[i];
    }
    
    return maxVal - minVal;
}