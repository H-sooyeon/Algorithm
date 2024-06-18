function solution(n, t, m, timetable) {
    // n: 셔틀 운행 횟수
    // t: 셔틀 운행 간격
    // m: 한 셔틀에 탈 수 있는 최대 크루 수
    // timetable: 크루가 대기열에 도착하는 시각
    let answer = '';
    let time = timetable.map((v) => v.split(':').map(Number));
    let bus_arrive = [[9, 0]];
    
    time.sort((a, b) => {
        if(a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0];
    })
    
    let bus_time = 0;
    for(let i = 1; i < n; i++) {
        let last_bus = bus_arrive[bus_arrive.length - 1];
        let h = 0, m = 0;
        if(t === 60) {
            h = last_bus[0] + 1;
            
            if(h < 24) bus_arrive.push([h, 0]);
            else break;
        }
        else {
            bus_time += t;
            if(bus_time < 60) {
                bus_arrive.push([last_bus[0], bus_time]);
            }
            else {
                let h = last_bus[0];
                h += 1;
                bus_time -= 60;
                
                if(h < 24) bus_arrive.push([h, bus_time]);
                else break;
            }
        }
    }
    
    // console.log('time ', time);
    // console.log('bus_arrive ', bus_arrive);
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            let arrive_person = time[0];
            
            // 버스보다 먼저 도착한 사람이 있다면
            if(arrive_person 
               && ((arrive_person[0] === bus_arrive[i][0] && arrive_person[1] <= bus_arrive[i][1]) 
               || (arrive_person[0] < bus_arrive[i][0]))) {
                // 만약 탈 수 있는 사람이 남았는데 
                // 콘이 마지막으로 탈 수 있는 기회라면 콘 탑승
                if(i == n - 1 && j === m - 1) {
                    // console.log('콘 탑승', arrive_person);
                    answer = [arrive_person[0], arrive_person[1] - 1];
                }
                else {
                    // 굳이 지금 안타도 된다면 크루 탑승
                    // console.log('크루 탑승')
                    time.shift();
                }
            }
            else {
                // console.log('버스보다 먼저 도착한 사람이 없어', bus_arrive[i], arrive_person);
                // 버스보다 먼저 도착한 사람은 없지만
                // 콘이 마지막으로 탈 수 있는 기회라면 콘 탑승
                if(i == n - 1 && j === m - 1) {
                    answer = [bus_arrive[i][0], bus_arrive[i][1]];
                }
            }
        }
    }
    
    // console.log('time ', time);
    // console.log(answer);
    
    if(answer[1] < 0) {
        answer[0] -= 1;
        answer[1] = 60 + answer[1];
    }
    
    answer = [answer[0].toString(), answer[1].toString()];
    if(answer[0].length < 2) answer[0] = '0' + answer[0];
    if(answer[1].length < 2) answer[1] = '0' + answer[1];
    
    return answer.join(':');
}