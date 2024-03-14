function solution(str1, str2) {
    let answer = 0;
    let arrA = [];
    let arrB = [];
    
    // 소문자로 모두 바꾼다.
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    // 문자열을 두 개씩 나누기
    for(let i = 1; i <= str1.length - 1; i++) {
        if(
            str1.charCodeAt(i-1) >= 97 && 
            str1.charCodeAt(i-1) <= 122 && 
            str1.charCodeAt(i) >= 97 && 
            str1.charCodeAt(i) <= 122
        ) {
            arrA.push(str1[i-1] + str1[i]);
        }
    };
    
    let union = arrA.length;
    let intersection = 0;
        
    for(let i = 0; i < str2.length-1; i++) {
        if(
            str2.charCodeAt(i) >= 97 && 
            str2.charCodeAt(i) <= 122 && 
            str2.charCodeAt(i+1) >= 97 && 
            str2.charCodeAt(i+1) <= 122
        ) {
            let word = str2.slice(i, i+2);
            console.log(word);
            if(arrA.includes(word)) {
                intersection++;
                arrA.splice(arrA.indexOf(word), 1);
            } else union++;
        }
    }
    
    // a와 b가 모두 공집합일 경우는 J(A, B) = 1
    answer = union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
    
    return answer;
}