// 최소 2회 이상 주문된 단품메뉴를 조합에 사용
// 어떤 조합을 다른 사람이 주문했는지 알 수 없으니 완전탐색 진행
function solution(orders, course) {
    let answer = [];
    const courseList = Array.from({length: 11});
    
    const combination = (start, maxDepth, visited, order, idx) => {
        if(idx === maxDepth) {
            if(!courseList[maxDepth]) {
                courseList[maxDepth] = new Map();
            }
            
            const map = courseList[maxDepth];
            let menu = '';
            for(let i = 0; i < visited.length; i++) {
                if(visited[i]) menu += order[i];
            }
            menu = menu.split('').sort().join('');
            map.set(menu, (map.get(menu) || 0) + 1);
            return;
        }
        
        for(let i = start + 1; i < order.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            combination(i, maxDepth, visited, order, idx + 1);
            visited[i] = false;
        }
    }
    
    for(let order of orders) {
        for(let c of course) {
            if(c > order.length) continue;
            
            const visited = new Array(order.length).fill(false);
            combination(-1, c, visited, order, 0);
        }
    }
    
    for(let c of course) {
        const map = courseList[c];
        
        if(map && map.size) {
            const sortedArray = [...map.entries()].sort((a, b) => b[1] - a[1]);
            
            if(sortedArray[0][1] > 1) {
                let maxValue = sortedArray[0][1];
                answer.push(sortedArray[0][0]);
            
                for(let i = 1; i < sortedArray.length; i++) {
                    if(sortedArray[i][1] !== maxValue) break;
                    else answer.push(sortedArray[i][0]);
                }
            }
        }
    }
    
    
    return answer.sort();
}