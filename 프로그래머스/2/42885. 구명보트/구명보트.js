function solution(people, limit) {
    var answer = 0;
    
    people.sort((a,b) => b - a);
    
    let left = 0, right = people.length - 1;
    while(left < right) {
        if(people[left] + people[right] <= limit) {
            left++;
            right--;
        } else {
            left++;
        }
        answer++;
    }
    
    console.log('left: ', left);
    console.log('left people:', people[left]);
    console.log('right: ', right);
    console.log('right people:', people[right]);
    if(left === right) answer++;
    
    return answer;
}