function solution(s) {
    let answer = '';
    const arr = s.split(' ').map(Number);
    
    let min = arr[0]
    let max = arr[1];
    
    arr.forEach((value) => {
        if(value > max) {
            max = value;
        }
        else if(value < min) {
            min = value;
        }
    })
        
    return `${min} ${max}`;
}