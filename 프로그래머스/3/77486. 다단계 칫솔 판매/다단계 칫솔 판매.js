function solution(enroll, referral, seller, amount) {
    // 칫솔 판매의 이익 10%는 추천인에게 배분, 나머지는 자신이 가짐
    // 1원 미만인 경우 자신이 모두 가진다.
    // 칫솔 판매 이익 100원
    
    // 판매원의 이름을 담은 배열 enroll
    // 추천인의 배열 referral
    // 판매량 데이터 판매원 이름 seller
    // 판매 수량 amount
    
    let answer = [];
    let result = {
        "center": {benefit: 0, referral: '-'}
    };
    
    enroll.forEach((p, idx) => {
        result[p] = {benefit: 0, referral: referral[idx]};
    })
    
    for(let [key, value] of Object.entries(result)) {
        if(value.referral === '-' && key !== 'center') {
            value.referral = 'center';
        }
    }
    
    const dfs = (referral, benefit) => {
        const money = Math.floor(benefit * 0.1);
        
        if(result[referral].referral === '-') return;
        
        result[referral].benefit += (benefit - money); 
        if(money < 1) {
            result[referral].benefit += money;
        }
        else {
            dfs(result[referral].referral, money);
        }
    }
    
    seller.forEach((p, idx) => {
        const money = Math.floor(amount[idx] * 100 * 0.1);
        result[p].benefit += amount[idx] * 100 - money;
        
        if(result[p].referral === '-' || money < 1) {
            result[p].benefit += money;
        }
        else {
            dfs(result[p].referral, money);
        }
    })
    
    // console.log(result);
    for(let [key, value] of Object.entries(result)) {
        if(key !== 'center') {
            answer.push(value.benefit);
        }
    }
    
    return answer;
}