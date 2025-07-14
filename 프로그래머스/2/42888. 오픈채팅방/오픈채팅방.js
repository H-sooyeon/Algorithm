function solution(record) {
    let answer = [];
    let map = new Map();
    
    record.forEach((v) => {
        let arr = v.split(' ');
        if(arr[0] === 'Enter' || arr[0] === 'Change') {
            let [status, uid, name] = v.split(' ');
            map.set(uid, name);
        }
    })
    
    record.forEach((v) => {
        let arr = v.split(' ');
        
        let lastName = map.get(arr[1]);
        if(arr[0] === 'Enter') {
            answer.push(`${lastName}님이 들어왔습니다.`);
        } else if(arr[0] === 'Leave') {
            answer.push(`${lastName}님이 나갔습니다.`)
        }
    })
        
    return answer;
}