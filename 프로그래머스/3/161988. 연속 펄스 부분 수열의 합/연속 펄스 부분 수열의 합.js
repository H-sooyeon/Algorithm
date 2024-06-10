function solution(sequence) {
    let answer = -987654321;
    let first = new Array(sequence.length);
    let second = new Array(sequence.length);
    
    first[0] = sequence[0] * -1;
    for(let i = 1; i < first.length; i++) {
        first[i] = first[i - 1] + sequence[i] * Math.pow(-1, i + 1);
    }
    
    second[0] = sequence[0];
    for(let i = 1; i < second.length; i++) {
        second[i] = second[i - 1] + sequence[i] * Math.pow(-1, i);
    }
    
    const subtotal = (arr) => {
        let minIdx = 0;
        for(let i = 1; i < arr.length; i++) {
            if(arr[minIdx] > arr[i]) {
                minIdx = i;
            }
            answer = Math.max(answer, arr[i] - arr[minIdx]);
            answer = Math.max(answer, arr[i]);
        }
    }
    
    if(sequence.length === 1) return Math.max(first[0], second[0]);
    
    // console.log(first);
    // console.log(second);
    
    subtotal(first);
    subtotal(second);
    
    return answer;
}