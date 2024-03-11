// 처음 앞 두 수의 최소공배수를 찾은 후
// 남은 수를 하나씩 앞에서 계산한 최소공배수와 엮어 최소공배수를 찾는다.
function solution(arr) {
    let answer = 0;
    
    const lcm = (a, b) => {
        return (a * b) / gcd(a, b);
    }
    
    const gcd = (a, b) => {
        let r = 0;
        while(b) {
            r = a % b;
            a = b;
            b = r;
        }
        return a;
    }
    
    if(arr.length === 1) answer = arr[0];
    else {
        let v = lcm(arr[0], arr[1]);
        for(let i = 2; i < arr.length; i++) {
            v = lcm(v, arr[i]);
        }
        answer = v;
    }
    
    return answer;
}