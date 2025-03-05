let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `3
// 7`.split("\n");

const n = Number(input[0]);
const k = Number(input[1]);

let row = 1;
let high = 10 ** 9;
let answer = 0;

while (row <= high) {
  const mid = Math.floor((row + high) / 2);

  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    cnt += Math.min(Math.floor(mid / i), n);
  }

  if (cnt < k) {
    row = mid + 1;
  } else {
    high = mid - 1;
    answer = mid;
  }
}

console.log(answer);
