function solution(numbers, hand) {
    // 1 4 7은 왼손
    // 3 6 9는 오른손
    // 2 5 8 0은 더 가까운 손, 거리가 같다면 hand로
    let answer = '';
    let left_hand = [1, 4, 7];
    let right_hand = [3, 6, 9];
    
    let current_left_hand = [3, 0];
    let current_right_hand = [3, 2];
    for(let i = 0; i < numbers.length; i++) {
        if(left_hand.includes(numbers[i])) {
            answer += 'L';
            if(numbers[i] === 1) current_left_hand = [0, 0];
            if(numbers[i] === 4) current_left_hand = [1, 0];
            if(numbers[i] === 7) current_left_hand = [2, 0];
        }
        else if(right_hand.includes(numbers[i])) {
            answer += 'R';
            if(numbers[i] === 3) current_right_hand = [0, 2];
            if(numbers[i] === 6) current_right_hand = [1, 2];
            if(numbers[i] === 9) current_right_hand = [2, 2];
        }
        else {
            // 2 5 8 0
            // 왼손과 오른손의 거리 계산
            let number_pos = [0, 0];
            if(numbers[i] === 2) number_pos = [0, 1];
            if(numbers[i] === 5) number_pos = [1, 1];
            if(numbers[i] === 8) number_pos = [2, 1];
            if(numbers[i] === 0) number_pos = [3, 1];
            
            let left_dist = Math.abs(current_left_hand[0] - number_pos[0]) + Math.abs(current_left_hand[1] - number_pos[1]);
            
            let right_dist = Math.abs(current_right_hand[0] - number_pos[0]) + Math.abs(current_right_hand[1] - number_pos[1]);
            
            if(left_dist < right_dist) {
                answer += 'L';
                current_left_hand = number_pos;
            }
            if(left_dist > right_dist) {
                answer += 'R';
                current_right_hand = number_pos;
            }
            if(left_dist === right_dist) {
                answer += hand === 'right' ? 'R' : 'L';
                if(hand === 'right') current_right_hand = number_pos;
                else current_left_hand = number_pos;
            }
        }
    }
    
    return answer;
}