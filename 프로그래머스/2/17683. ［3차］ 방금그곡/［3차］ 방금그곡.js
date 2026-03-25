function solution(m, musicinfos) {
    let answer = [];
    const replaceSharp = (str) => {
        return str.replace(/C#/g, 'c')
                  .replace(/D#/g, 'd')
                  .replace(/F#/g, 'f')
                  .replace(/G#/g, 'g')
                  .replace(/A#/g, 'a')
                  .replace(/B#/g, 'b')
    };
    
    const mSheet = replaceSharp(m);
    
    const convertTimeToMin = (time) => {
        const [hh, mm] = time.split(':').map(Number);
        return hh * 60 + mm;
    }
    
    const musicInfoFormat = (musicInfo) => {
        let [start, end, title, sheet] = musicInfo.split(',');
        let playSheet = '';
        [start, end] = [convertTimeToMin(start), convertTimeToMin(end)]
        
        const diff = end - start;
        sheet = replaceSharp(sheet);
        
        for(let i = 0; i < diff; i++) {
            const sheetIdx = i % sheet.length;
            playSheet += sheet[sheetIdx];
        }
        
        return [start, end, title, playSheet];
    }
    
    for(let musicInfo of musicinfos) {
        const [start, end, title, playSheet] = musicInfoFormat(musicInfo)
        
        if(playSheet.includes(mSheet)) {
            answer.push([end - start, start, end, title]);
        }
    }
    
    if(answer.length === 0) return '(None)';
    
    answer = answer.sort((a, b) => {
        if(a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0];
    })
    
    return answer[0][3];
}