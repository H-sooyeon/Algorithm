function solution(name) {
    let answer = Number.MAX_SAFE_INTEGER;
    const n = name.length;

    // 1. 알파벳 변경 횟수 (상하 이동) - 순서와 상관없으므로 미리 계산
    let alphaMove = 0;
    for (let i = 0; i < n; i++) {
        const diff = name.charCodeAt(i) - 65;
        alphaMove += Math.min(diff, 26 - diff);
    }

    // 2. 'A'가 아닌, 반드시 방문해야 할 인덱스들만 추출
    const targets = [];
    for (let i = 0; i < n; i++) {
        if (name[i] !== 'A') targets.push(i);
    }

    // 모든 글자가 'A'라면 이동할 필요 없음
    if (targets.length === 0) return 0;

    const visited = new Array(targets.length).fill(false);

    // 3. 백트래킹 함수 (사용자님의 makeList 구조 유지)
    const backtrack = (currIdx, count, moveSum) => {
        // 모든 목표 지점을 방문했다면 최소 이동 거리 갱신
        if (count === targets.length) {
            answer = Math.min(answer, moveSum);
            return;
        }

        // 가지치기: 이미 현재 최솟값보다 많이 움직였다면 중단
        if (moveSum >= answer) return;

        for (let i = 0; i < targets.length; i++) {
            if (visited[i]) continue;

            const nextIdx = targets[i];

            // [핵심 수정] 현재 위치(currIdx)에서 다음 목표(nextIdx)까지의 최단 거리
            // 원형 연결 리스트 구조이므로 두 가지 경로만 존재함
            const dist = Math.abs(currIdx - nextIdx);
            const shortest = Math.min(dist, n - dist); // 정방향 vs 역방향

            visited[i] = true;
            backtrack(nextIdx, count + 1, moveSum + shortest);
            visited[i] = false;
        }
    };

    // 0번 인덱스에서 시작 처리
    const startInTarget = targets.indexOf(0);
    if (startInTarget !== -1) {
        // 0번이 'A'가 아니라면 방문한 것으로 치고 시작
        visited[startInTarget] = true;
        backtrack(0, 1, 0);
    } else {
        // 0번이 'A'라면 방문 카운트 없이 시작
        backtrack(0, 0, 0);
    }

    return answer + alphaMove;
}