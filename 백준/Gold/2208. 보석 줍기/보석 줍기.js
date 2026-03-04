const fs = require("fs");

// 1. 입력 처리: 전체 데이터를 읽어와 공백/줄바꿈 단위로 분리
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(/\s+/);

let cursor = 0;
const N = parseInt(input[cursor++]);
const M = parseInt(input[cursor++]);

// 2. 누적 합(prefix_sum) 계산
// prefix_sum[0] = 0, prefix_sum[i] = 1번째부터 i번째까지의 합
const prefix_sum = new Float64Array(N + 1);
let currentSum = 0;
for (let i = 0; i < N; i++) {
  currentSum += Number(input[cursor++]);
  prefix_sum[i + 1] = currentSum;
}

// 3. 파이썬 로직 이식
let ans = 0; // 파이썬 코드와 동일하게 0으로 초기화
let tmp = 0; // 최솟값을 추적할 변수

// 파이썬의 for i in range(M - 1, N) 루프 대응
for (let i = M - 1; i < N; i++) {
  // tmp는 prefix_sum[0]부터 prefix_sum[i - M + 1]까지의 최솟값
  // i가 M-1일 때 prefix_sum[0]부터 검사하게 됨
  tmp = Math.min(tmp, prefix_sum[i - (M - 1)]);
  
  // 현재 구간의 합 계산 및 최댓값 갱신
  const currentRangeSum = prefix_sum[i + 1] - tmp;
  if (currentRangeSum > ans) {
    ans = currentRangeSum;
  }
}

console.log(ans);