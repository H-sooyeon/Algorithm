const fs = require("fs");

// 모든 공백 문자(줄바꿈 포함)를 기준으로 데이터를 쪼개서 배열로 만듭니다.
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split(/\s+/);

let ptr = 0;
const n = parseInt(input[ptr++]);
const m = parseInt(input[ptr++]);

// 누적 합 배열을 생성합니다. (n+1 크기)
const prefix = new Float64Array(n + 1);
for (let i = 1; i <= n; i++) {
  // input[ptr++]를 통해 순차적으로 보석 값을 가져옵니다.
  prefix[i] = prefix[i - 1] + Number(input[ptr++]);
}

let ans = 0; // 파이썬 코드와 동일하게 0으로 초기화
let tmp = 0; // 최솟값을 추적할 변수

// 파이썬의 for i in range(M - 1, N) 루프 대응
for (let i = m - 1; i < n; i++) {
  // tmp는 prefix_sum[0]부터 prefix_sum[i - M + 1]까지의 최솟값
  // i가 M-1일 때 prefix_sum[0]부터 검사하게 됨
  tmp = Math.min(tmp, prefix[i - (m - 1)]);

  // 현재 구간의 합 계산 및 최댓값 갱신
  const currentRangeSum = prefix[i + 1] - tmp;
  if (currentRangeSum > ans) {
    ans = currentRangeSum;
  }
}
console.log(ans);
