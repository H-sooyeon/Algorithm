function solution(s) {
    var answer = '';
    let check_eng = /[a-zA-Z]/;
    
    let str = s.split(' ');
    console.log(str);
    for(let i = 0; i < str.length; i++) {
        if(!str[i].length) continue;
        str[i] = str[i].toLowerCase();

        if(check_eng.test(str[i][0])) {
            str[i] = String.fromCharCode(str[i][0].charCodeAt() - 32) + str[i].slice(1);
        }
    }
    
    answer = str.join(' ');
    
    return answer;
}