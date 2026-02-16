function solution(s) {    
    const answer = s.split(' ').map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).join(' ');
    
    return answer;
}