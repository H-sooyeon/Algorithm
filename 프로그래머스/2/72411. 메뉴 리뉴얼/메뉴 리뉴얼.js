function solution(orders, course) {
    let answer = [];
    let result = {};
    
    const combi = (order, start, b, k) => {
        // course의 각 원소 값이랑 b의 길이가 같다면
        if(b.length === k) {
            // b에 저장된 인덱스 값으로 실제 문자 추출
            let list = [];
            b.forEach((v, idx) => {
                list.push(order[v]);
            });
            
            // 순서를 일정하게 유지해야 하므로 (중복 방지) 정렬해준다.
            list.sort();
            
            // 배열을 하나의 문자열로 만들어준다.
            list = list.join('');
            
            // 객체에 해당 문자열이 존재하면 개수 증가, 없으면 1로 초기화
            if(!result[list]) result[list] = 1;
            else result[list]++;
            
            return;
        }
        
        // 백트래킹
        for(let i = start + 1; i < order.length; i++) {
            b.push(i);
            combi(order, i, b, k);
            b.pop(i);
        }
    }
    
    for(let i = 0; i < course.length; i++) {
        // 각 course에 대한 모든 주문들을 돌면서 완전탐색 해준다.
        for(let j = 0; j < orders.length; j++) {
            combi(orders[j], -1, [], course[i]);
        }

        // 나온 값들 중 최소 2번 이상 나온 값들에 대해서만 배열에 추가해준다.
        let arr = [];
        for(let key in result) {
            if(result[key] > 1) arr.push([key, result[key]]);
        }
        
        // 내림차순으로 정렬
        arr.sort((a, b) => b[1] - a[1]);
        
        // 해당 course 만큼의 요리가 존재하지 않을 수 있으므로 존재할 경우에만 확인
        if(arr.length) {
            // 가장 큰 값을 answer에 저장, 가장 큰 값과 같은 값이 있다면 모두 저장
            answer.push(arr[0][0])
            for(let j = 1; j < arr.length; j++) {
                if(arr[j-1][1] === arr[j][1]) answer.push(arr[j][0]);
                else break;
            }
        }

        result = {};
    }
    
    // 문자열 정렬
    answer.sort();
    
    return answer;
}