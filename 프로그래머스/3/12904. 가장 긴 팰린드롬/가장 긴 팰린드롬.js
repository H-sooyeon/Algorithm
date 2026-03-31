function solution(s) {
    let answer = 1;
    
    if(s === s.split("").reverse().join("")) return s.length;
    if(s.length === 1) return 1;
    
    const expand = (s, left, right) => {
        while(left >= 0 && right < s.length && s[left] === s[right]) {
            left -= 1;
            right += 1;
        }
        
        // 팰린드롬 길이 반환
        return right - left - 1 > 0 ? right - left - 1 : 1;
    }
    
    for(let i = 0; i < s.length; i++) {
        const result = Math.max(answer, expand(s, i, i));
        answer = Math.max(answer, expand(s, i, i)) // 홀수 중심
        answer = Math.max(answer, expand(s, i, i+1)) // 짝수 중심
    }

    return answer; 
}