function solution(dice) {
    let answer = 0;
    const diceCnt = dice.length;
    
    // 주사위의 개수가 최대 10개 이므로, 조합을 사용하여 어떤 주사위를 가져갈 것인지 결정
    const diceCombinationA = [];
    const diceCombinationB = [];
    
    const combination = (start, v) => {
        if(v.length === Math.floor(diceCnt / 2)) {
            const diceA = [];
            const diceB = [];
            
            for(let i = 0; i < diceCnt; i++) {
                if(v.includes(i)) diceA.push(i);
                else diceB.push(i);
            }
            
            diceCombinationA.push([...diceA]);
            diceCombinationB.push([...diceB]);
        }
        
        for(let i = start + 1; i < diceCnt; i++) {
            v.push(i);
            combination(i, v);
            v.pop();
        }
    }
    
    combination(-1, []);
    
    const calDiceSum = (diceCombi, idx, sum, sumList, combiIdx) => {
        if(idx === diceCombi.length) {
            sumList[combiIdx].push(sum);
            return;
        }
        for(let i = 0; i < 6; i++) {
            calDiceSum(diceCombi, idx + 1, sum + dice[diceCombi[idx]][i], sumList, combiIdx);
        }
    }
    
    const combiCnt = diceCombinationA.length;
    const diceSumA = Array.from({length: combiCnt}, () => Array());
    const diceSumB = Array.from({length: combiCnt}, () => Array());
    
    // 나눈 주사위대로 승리한 횟수를 조합별로 저장
    for(let i = 0; i < combiCnt; i++) {
        const diceA = diceCombinationA[i];
        const diceB = diceCombinationB[i];
        
        calDiceSum(diceA, 0, 0, diceSumA, i);
        calDiceSum(diceB, 0, 0, diceSumB, i);
    }
    
    const calWinCnt = (listA, listB) => {
        let aWinCnt = 0;
        
        listA.sort((a, b) => a - b);
        listB.sort((a, b) => a - b);
        
        let target = 0;
        for(let i = 0; i < listA.length; i++) {
            for(let j = target; j < listB.length; j++) {
                if(listA[i] <= listB[j]) {
                    aWinCnt += j;
                    target = j;
                    break;
                }
            }
            if(listB[target] < listA[i]) {
                aWinCnt += listB.length;
            }
        }
        return aWinCnt;
    }

    let winA = 0;
    // 승리한 횟수가 가장 많은 주사위 조합을 리턴
    for(let i = 0; i < combiCnt; i++) {
        const sumA = diceSumA[i];
        const sumB = diceSumB[i];
                
        // 이분탐색으로 sumA의 각 요소가 얼마나 이길 수 있는지를 카운트
        const count = calWinCnt(sumA, sumB);
        
        if(count > winA) {
            winA = count;
            answer = i;
        }
    }    
        
    return diceCombinationA[answer].map((v) => v + 1);
}