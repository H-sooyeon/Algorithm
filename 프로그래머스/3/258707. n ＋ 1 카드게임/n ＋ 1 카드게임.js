// 게임에서 도달 가능한 최대 라운드의 수
function solution(coin, cards) {
    const n = cards.length;
    let copyCoin = coin;
    const START_CARD_CNT = cards.length / 3;
    const getCard = cards.slice(0, START_CARD_CNT);
    const keepCard = [];
    const cardInvalidate = new Array(1001).fill(false);
    const remainCards = cards.slice(START_CARD_CNT);
    
    for(let i = 0; i < START_CARD_CNT; i++) {
        cardInvalidate[getCard[i]] = true;
    }
    
    // cards에서 2개의 카드를 뽑아 keepCard에 보관
    const getTwoCards = () => {
        const card = remainCards.splice(0, 2);
        
        cardInvalidate[card[0]] = true;
        cardInvalidate[card[1]] = true;
        
        keepCard.push(...card);
    }
    
    // getCard에서 n+1을 만들 수 있다면 내고 다음으로 건너가기
    const canMakeNumInGetCard = () => {
        const idx = [];
        
        for(let i = 0; i < getCard.length; i++) {
            for(let j = 0; j < getCard.length; j++) {
                if(i === j) continue;
                
                const iCard = getCard[i];
                const jCard = getCard[j];
                if(cardInvalidate[iCard] && cardInvalidate[jCard] && iCard + jCard === n + 1) {
                    idx.push(...[iCard, jCard]);
                    break;
                }
            }
            if(idx.length > 0) break;
        }
        
        if(idx.length > 0) return [true, idx];
        return [false];
    }
    
    // getCard에서 n+1을 만들 수 없다면 getCard 1장, keepCard 1장으로 만들 수 있는지 확인
    // 만들 수 있다면 내고 다음으로 건너가기 (coin - 1)
    const canMakeNumInGetAndKeepCard = () => {
        const idx = [];
        
        for(let i = 0; i < START_CARD_CNT; i++) {
            const get = getCard[i];
            const remain = n + 1 - get;
            
            if(cardInvalidate[remain] && cardInvalidate[get]) {
                idx.push(...[get, remain]);
                break;
            }
        }
        
        if(idx.length > 0) return [true, idx];
        return [false];
    }
    
    // 모두 안된다면 keepCard에서 n+1을 만들 수 있는지 확인
    // 만들 수 있다면 내고 다음으로 건너가기 (coin - 2)
    // 안된다면 종료
    const canMakeNumInKeepCard = () => {
        const idx = [];
        
        for(let i = 0; i < keepCard.length; i++) {
            const card = keepCard[i];
            if(!cardInvalidate[card]) continue;
            
            const remain = n + 1 - card;
            if(cardInvalidate[remain]) {
                idx.push(...[card, remain]);
                
                break;
            }
        }
        
        if(idx.length > 0) return [true, idx];
        return [false];
    }
    
    let round = 1;
    while(remainCards.length > 0 && copyCoin >= 0) {
        getTwoCards(); // 라운드 시작
        
        let [canMake, idx] = canMakeNumInGetCard();
        if(canMake) {
            cardInvalidate[idx[0]] = false;
            cardInvalidate[idx[1]] = false;
            round += 1;
            
            continue;
        }
        
        [canMake, idx] = canMakeNumInGetAndKeepCard();
        if(canMake && copyCoin >= 1) {
            cardInvalidate[idx[0]] = false;
            cardInvalidate[idx[1]] = false;
            copyCoin -= 1;
            round += 1;
            
            continue;
        }
        
        [canMake, idx] = canMakeNumInKeepCard();
        if(canMake && copyCoin >= 2) {
            cardInvalidate[idx[0]] = false;
            cardInvalidate[idx[1]] = false;
            copyCoin -= 2;
            round += 1;
            
            continue;
        }
        
        break;
    }
    // coin이 0인 상태가 되면 종료
    
    return round;
}