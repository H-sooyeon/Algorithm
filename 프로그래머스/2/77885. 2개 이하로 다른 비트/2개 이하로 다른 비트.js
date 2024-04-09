function solution(numbers) {
    let answer = [];
    
    // n = 3 011, n = 5 101
    // n = 4 100, n = 5 101
    // n = 5 101, n = 6 110
    // n = 6 110, n = 7 111
    // n = 7 0111, n = 11 1011
    // n = 9 1001, n = 10 1010
    
    numbers.forEach((v, idx) => {
        let num_bit = v.toString(2);
        // 짝수라면 뒤에 1 추가
        if(v % 2 === 0) {
            let str = num_bit.slice(0, num_bit.length - 1) + '1';
            answer.push(parseInt(str, 2));
        }
        else {
            // 홀수라면 길이 맞춰주고 오른쪽부터 확인, 왼쪽0->1, 오른쪽1->0
            num_bit = '0' + num_bit;
            // console.log(num_bit);
            
            for(let i = num_bit.length - 1; i >= 0; i--) {
                // 홀수는 비트 값 1의 자리에 항상 값이 있음
                if(num_bit[i] === '0') {
                    let str = num_bit.slice(0, i) + '10' + num_bit.slice(i + 2);
                    // console.log(str);
                    num_bit = str;
                    break;
                }
            }
            answer.push(parseInt(num_bit, 2));
        }
    })
    
    return answer;
}