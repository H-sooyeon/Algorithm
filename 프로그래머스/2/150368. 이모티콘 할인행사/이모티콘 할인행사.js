// 이모티콘 할인율은 10, 20, 30, 40 중 하나
// 할인율은 순서를 고려해서 선택해야 한다. -> 순열

function solution(users, emoticons) {
    let answer = [0, 0];
    let sale = [9, 8, 7, 6];
    let selected = [];
    
    users.sort((a, b) => a[0] - b[0]);
    
    const permutation = (depth) => {
        if(depth === emoticons.length) {
            let arr = new Array(users.length).fill(0);
            for(let i = 0; i < selected.length; i++) {
                let value = selected[i];
                for (let j = 0; j < users.length; j++) {
                    if((10 - sale[value]) * 10 >= users[j][0]) {
                        arr[j] += parseInt(emoticons[i] / 10) * sale[value];
                    } else break;
                }
            }
            
            let join_plus = 0;
            let price = 0;
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] >= users[i][1]) {
                    join_plus++;
                }
                else {
                    price += arr[i];
                }
            }
            if(answer[0] < join_plus) {
                answer = [join_plus, price];
            }
            else if(answer[0] === join_plus && answer[1] < price) {
                answer = [join_plus, price];
            }
            
            return;
        }
        
        for(let i = 0; i < sale.length; i++) {
            selected.push(i);
            permutation(depth+1);
            selected.pop();
        }
    }
    
    permutation(0);
    
    return answer;
}