function solution(record) {
    let answer = [];
    const user = new Map();
    
    for(let line of record) {
        const [command, userId, nickname] = line.split(' ');
        
        if(command === 'Enter' || command === 'Change') {
            user.set(userId, nickname);
        }
    }
    
   
    for(let line of record) {
        const [command, userId, nickname] = line.split(' ');
        const userName = user.get(userId);
        
        if(command === 'Enter') {
            answer.push(`${userName}님이 들어왔습니다.`);
        }
        else if(command === 'Leave') {
            answer.push(`${userName}님이 나갔습니다.`);
        }
    }
    
    return answer;
}