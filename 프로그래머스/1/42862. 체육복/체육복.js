function solution(n, lost, reserve) {
    let answer = 0;
    
    let spare_st = reserve.filter((v) => !lost.includes(v));
    let lost_st = lost.filter((v) => !reserve.includes(v));
    
    spare_st.sort();
    lost_st.sort();
    
    answer += (n - lost_st.length);
    // console.log(answer, lost_st ,spare_st);
    
    let idx = 0;
    while(idx < spare_st.length) {
        let prev = lost_st.indexOf(spare_st[idx] - 1);
        let next = lost_st.indexOf(spare_st[idx] + 1);
        
        // console.log(prev, next, spare_st[idx]);
        
        if(prev >= 0) {
            let arr = lost_st.slice(0, prev);
            arr.push(...lost_st.slice(prev + 1));
            lost_st = [...arr];
            
            arr = spare_st.slice(0, idx);
            arr.push(...spare_st.slice(idx + 1));
            spare_st = [...arr];
            answer++;
        }
        else if(next >= 0) {
            let arr = lost_st.slice(0, next);
            arr.push(...lost_st.slice(next + 1));
            lost_st = [...arr];
            
            arr = spare_st.slice(0, idx);
            arr.push(...spare_st.slice(idx + 1));
            spare_st = [...arr];
            answer++;
        } else {
            idx++;
        }
    }
    
    
    return answer;
}