function solution(user_id, banned_id) {
    const bannedUserMap = new Map();
    const visited = new Map();
    
    // 초기화: 모든 유저를 방문 안 함 상태로 설정
    for(let user of user_id) {
        visited.set(user, false);
    }

    // 1. 수정 포인트: banned_id의 '인덱스'를 키로 사용 (중복 패턴 대비)
    for(let i = 0; i < banned_id.length; i++) {
        const pattern = banned_id[i];
        const matchedUsers = [];
        
        for(let user of user_id) {
            if(user.length !== pattern.length) continue;
            
            let flag = true;
            for(let j = 0; j < user.length; j++) {
                if(pattern[j] === '*') continue;
                if(user[j] !== pattern[j]) {
                    flag = false;
                    break;
                }
            }
            if(flag) matchedUsers.push(user);
        }
        // 패턴 문자열 대신 인덱스 i를 키로 저장
        bannedUserMap.set(i, matchedUsers);
    }
    
    const set = new Set();
    const combination = (bannedUserIdx) => {
        if(bannedUserIdx === banned_id.length) {
            // visited.values()는 삽입 순서를 보장하므로 중복 체크 가능
            set.add([...visited.values()].join(','));
            return;
        }
        
        // 2. 수정 포인트: 인덱스로 매칭된 유저 리스트를 가져옴
        const userList = bannedUserMap.get(bannedUserIdx);
        
        // 해당 패턴에 맞는 유저가 없을 경우 예외 처리
        if (!userList) return; 

        for(let i = 0; i < userList.length; i++) {
            const targetUser = userList[i];
            if(visited.get(targetUser)) continue;
            
            visited.set(targetUser, true);
            combination(bannedUserIdx + 1);
            visited.set(targetUser, false);
        }
    }
    
    combination(0);
    return set.size;
}