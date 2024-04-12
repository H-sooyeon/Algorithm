function solution(id_list, report, k) {
    let answer = [];
    report = new Set(report);
    
    let cnt_map = new Map();
    let report_map = new Map();
    let stop = new Set();
    
    report.forEach((v, idx) => {
        let [set_report, get_report] = v.split(' ');
        
        // 신고당한 ID의 횟수 저장
        if(cnt_map.has(get_report)) {
            let value = cnt_map.get(get_report);
            value++;
            if(value >= k) stop.add(get_report);
            else cnt_map.set(get_report, value);
        } else {
            cnt_map.set(get_report, 1);
            if(k === 1) stop.add(get_report);
        }
        
        // 유저가 신고한 ID 리스트 저장
        if(report_map.has(set_report)) {
            let value = report_map.get(set_report);
            value.push(get_report);
            report_map.set(set_report, value);
        } else {
            report_map.set(set_report, [get_report]);
        }
    })
    
    let map = new Map();
    id_list.forEach((v) => {
        map.set(v, 0);
    })
    
    // console.log(stop);
    // 유저가 신고한 ID들을 모두 돌면서 정지된 ID가 포함되는지 확인
    for(let [key, v] of report_map.entries()) {
        for(let set of stop) {
            if(v.includes(set)) {
                let value = map.get(key);
                value++;
                map.set(key, value);
            }
        }
    }
    
    // console.log(map);
    
    for(let [people, cnt] of map) {
        answer.push(cnt);
    }
    
    return answer;
}