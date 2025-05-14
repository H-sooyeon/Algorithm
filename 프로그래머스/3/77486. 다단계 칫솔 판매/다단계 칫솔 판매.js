// 각 판매원의 이름을 담은 배열 enroll
// 각 판매원을 다단계 조직에 참여시킨 다른 판매원의 이름을 담은 배열 referral
// 판매량 집계 데이터의 판매원 이름을 나열한 배열 seller
// 판매량 집계 데이터의 판매 수량을 나열한 배열 amount
function solution(enroll, referral, seller, amount) {
    let answer = [];
    const nodes = {};
    
    function Node(name, referral, profit) {
        this.name = name;
        this.referral = referral;
        this.profit = profit;
    }
    
    for(let i = 0; i < enroll.length; i++) {
        const recommender = referral[i];
        const name = enroll[i];
        
        const node = new Node(name, recommender, 0);
        nodes[name] = node;
    }
    
    const splitProceeds = (profit, node) => {
        const sendProfit = Math.floor(profit * 0.1);
        const myProfit = profit - sendProfit;
        
        if(sendProfit < 1) {
            node.profit += profit;
        }
        else {
            node.profit += myProfit;
            
            if(node.referral !== '-') {
                splitProceeds(sendProfit, nodes[node.referral]);
            }
        }
    }
    
    // 판매금을 나눠서 전달
    for(let i = 0; i < seller.length; i++) {
        const sellerName = seller[i];
        const sellAmount = amount[i];
        
        const profit = sellAmount * 100;
        splitProceeds(profit, nodes[sellerName]);
    }
    
    enroll.forEach((name) => {
        answer.push(nodes[name].profit);
    })
    
    
    return answer;
}