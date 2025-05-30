// 매칭 점수가 가장 높은 웹페이지의 Index 반환
// 여러 개라면 그중 번호가 가장 작은 것
function solution(word, pages) {
    let answer = 0;
    let maxMatchingScore = 0;
    const defaultRex = new RegExp(`(?<![a-zA-Z])${word}(?![a-zA-Z])`, 'ig');
    const outLinkRex = /<a\s+href="([^"]*)"/ig;
    const metaRex = /<meta\s+property=\"og:url\"\s+content="([^"]*)"/ig;
    
    const pagesInfo = {};
    
    function Page(defaultScore, outLink, linkScore, matchingScore) {
        this.defaultScore = defaultScore;
        this.outLink = outLink;
        this.linkScore = linkScore;
        this.matchingScore = matchingScore;
    }
    
    // 먼저 페이지의 기본 정보 저장하기
    pages.forEach((page) => {
        let wordMatching = page.match(defaultRex);
        if(wordMatching === null) wordMatching = [];
        const outLink = [...page.matchAll(outLinkRex)].map((v) => v[1]);
        const meta = [...page.matchAll(metaRex)].map((v) => v[1])[0];
        
        pagesInfo[meta] = new Page(wordMatching.length, outLink, 0, 0);
    })
    
    // link 타고 외부 링크 점수 계산하기
    for(let [url, page] of Object.entries(pagesInfo)) {
        for(let link of page.outLink) {
            if(pagesInfo[link] === undefined) continue;
            const outLinkPage = pagesInfo[link];
            outLinkPage.linkScore += page.defaultScore / page.outLink.length;
        }
    }
    
    // matching 점수 계산하기
    for(let [url, page] of Object.entries(pagesInfo)) {
        page.matchingScore = page.defaultScore + page.linkScore;
    }
    
    Object.entries(pagesInfo).forEach(([key, page], idx) => {
        if(maxMatchingScore < page.matchingScore) {
            answer = idx;
            maxMatchingScore = page.matchingScore;
        }
    }); 
    
    return answer;
}