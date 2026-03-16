// HEAD는 숫자가 아닌 문자로 이루어짐
// NUMBER는 연속된 숫자로 이루어짐(최대 다섯 글자)
// TAIL은 나머지 부분
function solution(files) {
    // 문자열 비교시 대소문자 구분을 하지 않는다.
    let answer = [];
    const regex = /^([^0-9]+)([0-9]{1,5})(.*)$/
    let list = [];
    
    for(let file of files) {
        const matches = file.match(regex);
        
        if(matches) {
            const [full, head, number, tail] = matches;
            list.push([head, number, tail]);
        }
    }
    
    list = list.sort((a, b) => {
        if(a[0].toLowerCase() === b[0].toLowerCase()) {
            return Number(a[1]) - Number(b[1]);
        }
        return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    })
            
    return list.map((item) => item.join(''));
}