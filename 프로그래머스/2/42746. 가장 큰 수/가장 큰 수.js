function solution(numbers) {    
    numbers = numbers.map((number) => number.toString());
    numbers = numbers.sort((a, b) => (b + a) - (a + b));
    
    if(numbers[0] === '0') return '0';
    return numbers.join('');
}