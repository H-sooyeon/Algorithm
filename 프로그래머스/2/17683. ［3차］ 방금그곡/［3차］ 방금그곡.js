function solution(m, musicinfos) {
    let answer = [];
    let arr = Array.from({length: musicinfos.length}, () => []);
    let time = new Array(musicinfos.length).fill(0);
    let title = new Array(musicinfos.length).fill('');
    let sheetArr = new Array(musicinfos.length).fill('');
    
    for(let i = 0; i < musicinfos.length; i++) {
        let tmp = musicinfos[i].split(',');
        let [startHour, startMin] = tmp[0].split(':').map(Number);
        let [endHour, endMin] = tmp[1].split(':').map(Number);
        
        time[i] = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        title[i] = tmp[2]; // 곡 제목
        let sheet = tmp[3]; // 악보 정보
        
        for(let j = 0; j < sheet.length; j++) {
            if(sheet[j] === '#') continue;
            
            if((j !== sheet.length - 1) && sheet[j+1] === '#') {
                let value = sheet[j] + sheet[j+1];
                arr[i].push(value);
            }
            else {
                arr[i].push(sheet[j]);
            }
        }
        
        // 재생 시간만큼 이어 붙이기
        let idx = 0;
        while(time[i] - arr[i].length > 0) {
            arr[i].push(arr[i][idx % arr[i].length]);
            idx++;
        }
        // 악보 길이보다 재생 시간이 짧을 때
        arr[i] = arr[i].slice(0, time[i]);

        sheetArr[i] = arr[i].join('');
    }
        
    for(let i = 0; i < sheetArr.length; i++) {
        let str = sheetArr[i];
        
        if(str.includes(m)) {
            let sheetIdx = str.indexOf(m);
            
            while(sheetIdx !== -1) {
                if(str[sheetIdx + m.length] !== '#') {
                    answer.push([title[i], time[i]]);
                    break;
                }
                sheetIdx = str.indexOf(m, sheetIdx + 1);
            }
        }
    }
    
    if(answer.length === 0) return '(None)';
    
    answer = answer.sort((a, b) => b[1] - a[1]);
    
    return answer[0][0];
}