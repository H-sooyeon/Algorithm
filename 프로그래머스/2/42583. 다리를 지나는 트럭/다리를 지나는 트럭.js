function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    let arr = [];
    let truck = truck_weights.map((v, idx) => {
        return {weight: v, time: 1};
    })
    
    if(truck_weights.length === 1) return bridge_length + 1;
    
    let value = 0;
    let flag = false;
    while(arr.length || truck.length) {
        arr.forEach((v, idx) => v.time++);
        flag = false;

        // 다리에 트럭이 들어갈 수 있다면 넣기
        if(truck.length && value + truck[0].weight <= weight) {
            let truck_info = truck.shift();
            arr.push(truck_info);
            value += truck_info.weight;
            answer++;
            // console.log('트럭 들어가기 ', value, truck_info, answer);
            flag = true;
        }
        
        // 가장 앞의 트럭을 확인해서 다리를 다 지났는지 확인
        if(arr[0].time >= bridge_length) {
            let truck_info = arr.shift();
            value -= truck_info.weight;
            // console.log('트럭 나가기 ', value, truck_info, answer);
        }
        
        if(!flag) {
            answer++;
            // console.log('대기..', arr[0], answer);
        }
    } 
    
    return answer + 1;
}