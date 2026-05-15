// 원소의 개수가 n개 이상인 애들을 교집합 원소로 사용
// map으로 각 원소의 개수를 저장

// 각 집합 내의 숫자들이 서로 달라야 한다.
// 교집합 원소가 남으면 집합 내의 숫자들이 서로 달라야 한다는 조건에 만족하지 못하므로 0 반환
// 교집합 원소를 제외한 다른 원소들의 총 합이 교집합 원소의 개수로 나누어 떨어지지 않다면 0 반환
// 떨어진다면 몫 반환
function solution(a) {
    let answer = 0;
    const map = new Map();
    
    if(a.length === 1) return 0;
    
    a.forEach((value) => {
        map.set(value, (map.get(value) ?? 0) + 1); 
    })
    
    // 개수가 가장 많은 원소를 교집합 원소로 사용
    // 개수가 가장 많은 워소의 개수가 여러 개일 수 있으며, 그 경우에는 교집합 원소가 여러개
    const sortedMap = [...map.entries()].sort((a, b) => b[1] - a[1]);
    
    // x가 2n이기 때문
    for(let [key, count] of sortedMap) {
        if(count * 2 <= answer) continue;
        
        let total = 0;
        // 현재 key를 교집합으로 사용한다고 했을 때 다른 원소는 교집합과 달라야 함
        for(let i = 0; i < a.length - 1;) {
            if((a[i] === key || a[i+1] === key) && a[i] !== a[i+1]) {
                // 하나의 집합으로 만듬
                total += 2;
                i += 2;
            }
            else {
                i += 1;
            }
        }
        
        answer = Math.max(answer, total);
    }
        
    return answer;
}