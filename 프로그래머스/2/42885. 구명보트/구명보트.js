function solution(people, limit) {
    let answer = 0;
    
    people.sort((a, b) => a - b);

    let left_pointer = 0;
    let right_pointer = people.length - 1;
    while(left_pointer <= right_pointer) {
        if(people[left_pointer] + people[right_pointer] <= limit) {
            // console.log(people[left_pointer] + people[right_pointer]);
            answer++;
            left_pointer++;
            right_pointer--;
        }
        else {
            // console.log(people[left_pointer] + people[right_pointer]);
            answer++;
            right_pointer--;
        }
    }
    
    return answer;
}