function solution(info, query) {
    let answer = [];
    let map = new Map();
    
    info.forEach((v, idx) => {
        let [lang, field, career, food, score] = v.split(' ');
        let key = `${lang}-${field}-${career}-${food}`;
        if(map.get(key)) {
            map.set(key, [...map.get(key), +score]);
        } else {
            map.set(key, [+score]);
        }
    })
    
    for(let [key, value] of map.entries()) {
        map.set(key, value.sort((a, b) => a - b));
    }
    
    const binarySearch = (list, value) => {
        let start = 0;
        let end = list.length;
        
        while(start <= end) {
            let mid = Math.floor((start + end) / 2);
            
            if(list[mid] < value) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        
        return list.length - start;
    }
    
    const separatedQuery = (query) => {
        let q = query.split(' and ');
        let last = q[q.length - 1].split(' ');
        q = [...q.slice(0, -1), ...last];
        let [lang, field, career, food, score] = q;
        
        lang = lang === '-' ? ['java', 'python', 'cpp'] : [lang];
        field = field === '-' ? ['frontend', 'backend'] : [field];
        career = career === '-' ? ['junior', 'senior'] : [career];
        food = food === '-' ? ['pizza', 'chicken'] : [food];
                
        let ret = [];
        for(let la of lang) {
            for(let fi of field) {
                for(let ca of career) {
                    for(let fo of food) {
                        let key = `${la}-${fi}-${ca}-${fo}`;
                        ret.push([key, +score]);
                    }
                }
            }
        }
        return ret;
    }
    
    
    const ret = query.map(q => {
        const newQueryList = separatedQuery(q);
        let sum = 0;
        
        for(const [newQuery, score] of newQueryList) {
            const list = map.get(newQuery);
            sum += list ? binarySearch(list, score) : 0;
        }
        
        answer.push(sum);
    })
    
    
    return answer;
}