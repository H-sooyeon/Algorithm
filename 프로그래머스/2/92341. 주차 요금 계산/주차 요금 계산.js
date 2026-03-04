function solution(fees, records) {
    let answer = [];
    const carMap = new Map();
    const timeMap = new Map();
    const [defaultTime, defaultFee, unitTime, unitFee] = fees;
    
    const makeMinTime = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        return hh * 60 + mm;
    }
    
    for(let record of records) {
        const [time, carNumber, detail] = record.split(' ');
        
        const minTime = makeMinTime(time);
        
        if(carMap.has(carNumber)) {
            const inCarMinTime = carMap.get(carNumber);
            
            let diff = minTime - inCarMinTime;
                        
            const prevTime = timeMap.get(carNumber);
            timeMap.set(carNumber, prevTime + diff)
            
            carMap.delete(carNumber);
        }
        else {
            if(!timeMap.has(carNumber)) {
                timeMap.set(carNumber, 0);
            }

            carMap.set(carNumber, minTime);
        }
    }
    
    // 출차된 내역이 없는 차의 누적 시간 계산
    for(let [carNumber, inTime] of carMap) {
        const prevTime = timeMap.get(carNumber);
        const lastTime = makeMinTime("23:59");
        
        timeMap.set(carNumber, prevTime + lastTime - inTime);
    }
    
    // 요금 계산
    for(let [carNumber, prefixTime] of timeMap) {
        let fee = 0;
        
        if(prefixTime >= defaultTime) {
            prefixTime -= defaultTime;
            fee += defaultFee;
        }
        else {
            answer.push([carNumber, defaultFee]);
            continue;
        }
        
        fee += (Math.ceil(prefixTime / unitTime) * unitFee);
        
        answer.push([carNumber, fee]);
    }
    
    answer.sort((a, b) => Number(a[0]) - Number(b[0]));
    return answer.map((item) => item[1]);
}