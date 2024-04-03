function solution(fees, records) {
    let [default_time, default_fee, unit_time, unit_fee] = fees;
    
    let arr = records.map((v) => {
        let [time, car_number, history] = v.split(' ');
        let [hour, min] = time.split(':').map(Number);
        
        time = hour * 60 + min;
        car_number = parseInt(car_number);
        
        return [time, car_number, history];
    });
        
    // 각 차량을 키로하여 입출력 내역을 저장한다.
    let map = new Map();
    arr.forEach(([time, car_number, history], i) => {
        if(map.has(car_number)) {
            let values = map.get(car_number);
            
            values.push([time, history]);
            map.set(car_number, values);
        } 
        else {
            map.set(car_number, [[time, history]]);
        }
    })
    
    // console.log(map);
    
    // map의 키를 돌며 차량별 총 누적 시간과 주차요금을 구한다.
    let cars_fee = [];
    for(let [key, values] of map) {
        let total = 0;
        let time = 0;
        
        // 총 누적 시간을 구한다.
        for(let i = 0; i < values.length; i++) {
            if(values[i][1] === 'IN') {
                time += values[i][0];
                // 들어오고 나가는 내역이 없을 때 (어차피 마지막 내역에만 가능)
                if(i === values.length - 1) {
                    total += ((23 * 60 + 59) - time);
                }
            };
            
            if(values[i][1] === 'OUT') {
                total += values[i][0] - time;
                time = 0;
            }
        }
        
        // 총 누적 시간에 대한 주차 요금 계산
        let fee = 0;
        if(total > default_time) {
            fee = default_fee + Math.ceil((total - default_time) / unit_time) * unit_fee;
        } else {
            fee = default_fee;
        }
        
        cars_fee.push([key, fee]);
    }
    
    // 차량 번호가 작은 자동차부터 차례로 주차요금 출력
    cars_fee = cars_fee.sort((a, b) => a[0] - b[0]);
    
    let answer = cars_fee.map((v, i) => v[1]);
    
    return answer;
}