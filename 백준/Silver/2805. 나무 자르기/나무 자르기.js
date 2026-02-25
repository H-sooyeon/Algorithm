const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

let left = 0;
let right = Math.max(...list); // 정렬하지 않아도 Math.max로 충분합니다.
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let total = 0;

  // reduce 대신 for 루프로 속도 최적화
  for (let i = 0; i < n; i++) {
    if (list[i] > mid) {
      total += list[i] - mid;
    }
  }

  if (total >= m) {
    // 나무를 충분히 얻었으므로, 높이를 더 높여봅니다 (최댓값 찾기)
    answer = mid;
    left = mid + 1;
  } else {
    // 나무가 부족하므로, 높이를 낮춰야 합니다
    right = mid - 1;
  }
}

console.log(answer);