// bridge_length가 트럭이 지나가는 길이이자 한 번에 올라갈 수 있는 트럭의 수
// 다리에 올라간 트럭의 무게를 변수에 저장
// 다리에 올라간 트럭의 수를 변수에 저장
// 다음 트럭이 올라가지 못한다면(다리가 무게를 버티지 못한다면) 트럭이 나갈 때까지의 시간을 한 번에 더하기
// 모든 트럭이 다리를 지나갔다면 반복문 탈출
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    const copyTrucks = [...truck_weights];
    
    let truckIdx = 0;
    let truckWeightOnBridge = 0;
    let truckCntOnBridge = 0;
    const trucksOnBridge = [];
    while(truckIdx < copyTrucks.length) {
        // 다음 트럭이 다리를 지나갈 수 있다면 트럭 추가
        while(truckIdx < copyTrucks.length) {
            answer += 1;
            const truckWeight = copyTrucks[truckIdx];
            
            truckWeightOnBridge += truckWeight;
            truckCntOnBridge += 1;
            trucksOnBridge.push([truckIdx, truckWeight, answer]);
            // console.log('truck 추가', truckIdx, truckWeight);
            // console.log('추가 후 다리 상태', truckWeightOnBridge, truckCntOnBridge, trucksOnBridge);
            // console.log('시간', answer);
            truckIdx += 1;
            
            while(answer - trucksOnBridge[0][2] >= bridge_length) {
                const truck = trucksOnBridge.shift();
                truckWeightOnBridge -= truck[1];

                truckCntOnBridge -= 1;
                // console.log('truck 다리에서 제거', truck);
                // console.log('제거 후 다리 상태', truckWeightOnBridge, truckCntOnBridge, trucksOnBridge);
                // console.log('시간', answer);
            }
            
            // 다음 트럭이 지나갈 수 있는 상태인가?
            if(truckWeightOnBridge + copyTrucks[truckIdx] > weight || truckCntOnBridge + 1 > bridge_length) {
               break;
            }
        }
        
        // 다음 트럭이 지나갈 수 없는 상태이므로 지나갈 수 있을 때까지 대기
        while(truckWeightOnBridge + copyTrucks[truckIdx] > weight || truckCntOnBridge + 1 > bridge_length) {
            const truck = trucksOnBridge.shift();
            truckWeightOnBridge -= truck[1];
            truckCntOnBridge -= 1;
            
            answer += bridge_length - (answer - truck[2]) - 1;
        }
        
        // console.log('지나갈 수 있을 때까지 대기한 뒤 다리 상태', truckWeightOnBridge, truckCntOnBridge, trucksOnBridge)
        // console.log('시간', answer);
    }
    
    if(trucksOnBridge.length) {
        for(let truck of trucksOnBridge) {
            answer += bridge_length - (answer - truck[2]) 
        }
    }
        
    return answer;
}