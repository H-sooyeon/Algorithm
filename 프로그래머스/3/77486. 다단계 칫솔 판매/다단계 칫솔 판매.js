// 이익의 10%를 추천인에게 타고 가며 전달한다.
// 금액은 원 단위에서 절사
// 판매원의 이름을 담은 배열 enroll
// 추천인 배열 referral
// 판매량 집계 데이터 seller
// 판매 수량 amount
function solution(enroll, referral, seller, amount) {
    let answer = [];
    const employee = {};
    
    function Node(name, referral) {
        this.name = name;
        this.referral = referral;
        this.amount = 0;
    }
    
    const divideAmount = (total, node) => {
        if(total <= 1) {
            node.amount += total;
            return;
        }
        
        const percent10 = Math.floor(total * 0.1);
        node.amount += (total - percent10);
        
        if(node.referral) {
            divideAmount(percent10, employee[node.referral]);
        }
    }
    
    for(let i = 0; i < referral.length; i++) {
        const name = enroll[i];
        const recommender = referral[i] === '-' ? null : referral[i];;
        
        employee[name] = new Node(name, recommender);
    }
    
    for(let i = 0; i < amount.length; i++) {
        const name = seller[i];
        const cnt = amount[i];
        
        const total = cnt * 100;
        divideAmount(total, employee[name]);
    }
    
    for(let person of enroll) {
        answer.push(employee[person].amount);
    }    
    
    return answer;
}