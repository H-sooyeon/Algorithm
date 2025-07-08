function solution(info, query) {
    let answer = [];
    const map = new Map();
    
    info.forEach((v, idx) => {
        const [lang, field, career, food, score] = v.split(' ');
        const key = `${lang}-${field}-${career}-${food}`;
        
        if(map.has(key)) {
            map.set(key, [...map.get(key), +score]);
        }
        else {
            map.set(key, [+score]);
        }
    })
    
    for(let [key, value] of map) {
        map.set(key, value.sort((a, b) => a - b));
    }
    
    const targetCnt = (target, score) => {
        let left = 0;
        let right = target.length;
        
        while(left <= right) {
            let mid = Math.floor((left + right) / 2);
            
            if(score > target[mid]) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        
        return target.length - left;
    }
    
    const separatedQuery = (query) => {
        let q = query.split(' and ');
        let last = q.pop();
        let [food, score] = last.split(' ');
        let [lang, field, career] = q;
        
        lang = lang === '-' ? ['cpp', 'java', 'python'] : [lang];
        field = field === '-' ? ['backend', 'frontend'] : [field];
        career = career === '-' ? ['junior', 'senior'] : [career];
        food = food === '-' ? ['chicken', 'pizza'] : [food];
        
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
            
            sum += list ? targetCnt(list, score) : 0;
        }
        answer.push(sum);
    })
    
    return answer;
}