function solution(record) {
    let answer = [];
    let map = new Map();
    
    record.forEach((v, idx) => {
        let [state, uid, name] = v.split(' ');
        if(state !== 'Leave') {
            map.set(uid, name);
        }
    })
    
    for(let i = 0; i < record.length; i++) {
        let [state, uid, name] = record[i].split(' ');
        
        if(state === 'Change') continue;
        
        let state_str = '';
        switch(state) {
            case 'Enter':
                state_str = '들어왔습니다.';
                break;
            case 'Leave':
                state_str = '나갔습니다.';
        }
        
        answer.push(`${map.get(uid)}님이 ${state_str}`);
    }
    
    return answer;
}