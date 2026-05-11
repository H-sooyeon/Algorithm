// cpp, java, python
// backend, frontend
// junior, senior
// chicken, pizza
// info: 개발언어 직군 경력 소울푸드 점수
// query: 개발언어 and 직군 and 경력 and 소울푸드 X
function solution(info, query) {
    let answer = [];
    const map = new Map();
    
    // 사람을 각 조건에 맞춰 저장
    info.forEach((v, idx) => {
        const [la, fi, hi, fo, score] = v.split(' ');
        
        const key = `${la}-${fi}-${hi}-${fo}`;
        if(!map.has(key)) map.set(key, []);
        
        map.get(key).push(+score);
     })
    
    // 같은 조건 내에서 점수로 오름차순 정렬
    for(let [key, value] of map) {
        map.set(key, value.sort((a, b) => a - b));
    }
    
    const lowerBound = (target, score) => {
        let left = 0;
        let right = target.length;
        
        while(left < right) {
            let mid = Math.floor((left + right) / 2);
            
            if(target[mid] < score) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return target.length - right;
    }
    
    const separatedQuery = (query) => {
        let q = query.split(' and ');
        let last = q.pop();
        let [food, score] = last.split(' ');
        let [lang, field, career] = q;
        
        lang = lang === '-' ? ['cpp', 'java', 'python'] : [lang];
        field = field === '-' ? ['frontend', 'backend'] : [field];
        career = career === '-' ? ['junior', 'senior'] : [career];
        food = food === '-' ? ['pizza', 'chicken'] : [food];
        
        let result = [];
        for(let la of lang) {
            for(let fi of field) {
                for(let ca of career) {
                    for(let fo of food) {
                        const key = `${la}-${fi}-${ca}-${fo}`;
                        result.push([key, +score]);
                    }
                }
            }
        }
        return result;
    }
    
    query.forEach((q) => {
        const newQueryList = separatedQuery(q);
        let sum = 0;
        
        for(let [newQuery, score] of newQueryList) {
            let list = map.get(newQuery);
            sum += list ? lowerBound(list, score) : 0;
        }
        answer.push(sum);
    })
    
    return answer;
}