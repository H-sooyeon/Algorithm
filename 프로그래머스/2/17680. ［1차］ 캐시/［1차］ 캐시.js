function solution(cacheSize, cities) {
    let answer = 0;
    let cache = [];
    
    cities.forEach((city) => {
        const translatedCity = city.toUpperCase();
        
        const idx = cache.indexOf(translatedCity);
        if(idx !== -1 && cacheSize) {
            // cache hit
            cache.splice(idx, 1);
            cache.push(translatedCity);
            answer++;
        }
        else {
            if(cache.length >= cacheSize) {
                cache.shift();
            }
            cache.push(translatedCity);
            answer += 5;
        }
    })
    
    return answer;
}