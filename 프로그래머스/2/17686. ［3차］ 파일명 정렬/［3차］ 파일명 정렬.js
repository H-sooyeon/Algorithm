function solution(files) {
    let answer = [];
    
    let modify_files = files.map((file, idx) => {
        // head, number, tail 구분
        let split_file_data = file.split(/(\d+)/);
        // 대소문자를 구분하지 않기 위해 소문자로 변경
        let head = split_file_data[0].toLowerCase();
        let number = parseInt(split_file_data[1]);
        
        return [head, number, idx];
    })
        
    modify_files.sort((a, b) => {
        if(a[0] === b[0]) {
            return a[1] - b[1];
        } else {
            return a[0].localeCompare(b[0]);
        }
    });
    
    modify_files.forEach(([head, number, idx]) => {
        answer.push(files[idx]);
    })
    
    return answer;
}