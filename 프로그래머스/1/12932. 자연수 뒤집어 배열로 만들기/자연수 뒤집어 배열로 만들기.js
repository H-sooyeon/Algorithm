function solution(n) {
    n = n.toString().split('').reverse();
    n = n.map((v) => Number(v));
    
    return n;
}