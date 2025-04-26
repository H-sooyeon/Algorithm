function solution(scores) {
    let answer = 0;
    const personScores = scores.map((score, idx) => [idx, ...score])
    const len = personScores.length;

    personScores.sort((a, b) => {
        if(a[1] === b[1]) {
            return b[2] - a[2];
        }
        return a[1] - b[1];
    })
    
    let maxPerson = personScores[len - 1];
    const filteredPerson = [];
    
    for(let i = len - 1; i >= 0; i--) {
        const curPerson = personScores[i];
        
        if(curPerson[2] > maxPerson[2]) {
            maxPerson = [...curPerson];
        }
        else if(curPerson[1] < maxPerson[1] && curPerson[2] < maxPerson[2]) {
            continue;
        }
        filteredPerson.push([curPerson[0], curPerson[1] + curPerson[2]]);
    }
    
    filteredPerson.sort((a, b) => {
        if(a[1] === b[1]) return a[0] - b[0];
        return b[1] - a[1]
    });
    if(filteredPerson[0][0] === 0) {
        return 1;
    }
    
    for(let i = 0; i < filteredPerson.length; i++) {
        if(filteredPerson[i][0] === 0) return i+1;
    }
        
//     let duplication = 0;
//     let rank = 1;
//     for(let i = 1; i < filteredPerson.length; i++) {
//         if(filteredPerson[i-1][1] === filteredPerson[i][1]) {
//             duplication += 1;
//         }
//         else if(filteredPerson[i-1][1] > filteredPerson[i][1]) {
//             rank += (1 + duplication);
//             duplication = 0;
//         }
        
//         if(filteredPerson[i][0] === 0) {
//             return rank;
//         }
//     }
    
    return -1;
}