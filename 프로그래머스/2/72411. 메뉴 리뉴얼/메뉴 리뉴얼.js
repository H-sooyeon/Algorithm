function solution(orders, course) {
    let answer = [];
    let result = {};
    
    const combi = (order, start, b, k) => {
        if(b.length === k) {
            let list = [];
            b.forEach((v, idx) => {
                list.push(order[v]);
            });
            list.sort();
            
            list = list.join('');
            
            if(!result[list]) {
                result[list] = 1;
            }
            else {
                result[list]++;
            }
            
            return;
        }
        
        for(let i = start + 1; i < order.length; i++) {
            b.push(i);
            combi(order, i, b, k);
            b.pop(i);
        }
    }
    
    for(let i = 0; i < course.length; i++) {
        for(let j = 0; j < orders.length; j++) {
            combi(orders[j], -1, [], course[i]);
        }

        let arr = [];
        for(let key in result) {
            if(result[key] > 1) arr.push([key, result[key]]);
        }
        
        arr.sort((a, b) => b[1] - a[1]);
        
        if(arr.length) {
            answer.push(arr[0][0])
            for(let j = 1; j < arr.length; j++) {
                if(arr[j-1][1] === arr[j][1]) answer.push(arr[j][0]);
                else break;
            }
        }

        result = {};
    }
    
    answer.sort();
    
    return answer;
}