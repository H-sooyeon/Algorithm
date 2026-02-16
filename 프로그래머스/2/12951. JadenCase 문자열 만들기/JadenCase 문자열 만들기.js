function solution(s) {
    let answer = '';
    
    /*
    * split으로 단어를 구분
    * 모든 단어를 소문자로 변환
    * 순회하면서 단어의 첫 글자가 typeof Number가 아니라면 대문자로 변환
    */
    
    const arr = s.split(' ');
    
    const result = [];
    arr.forEach((value) => {
        if(!value) {
            result.push([]);
            return;
        }
        
        if(typeof value[0] === 'Number') {
            result.push(value.toLowerCase());
            return;
        }
        
        const tmp = value.toLowerCase().slice(1);
        result.push(`${value[0].toUpperCase()}${tmp}`);
    })
    
    answer = result.join(' ');
    
    return answer;
}