let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `18 3
// 001
// 100
// 100
// 000
// 011
// 010
// 100
// 100
// 010
// 010
// 010
// 110
// 101
// 101
// 000
// 110
// 000
// 110
// 001
// 100
// 011
// 000
// 100
// 010
// 011
// 100
// 101
// 101
// 010
// 001
// 010
// 010
// 111
// 110
// 111
// 001`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let a = input.slice(1, n + 1).map((v) => v.split("").map(Number));
let b = input.slice(n + 1).map((v) => v.split("").map(Number));

// if (n < 3 || m < 3) {
//   console.log(-1);
// } else {
let answer = 0;
for (let i = 0; i <= n - 3; i++) {
  for (let j = 0; j <= m - 3; j++) {
    if (a[i][j] !== b[i][j]) {
      answer++;

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          a[i + k][j + l] = 1 - a[i + k][j + l];
        }
      }
    }
  }
}

let flag = true;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (a[i][j] !== b[i][j]) {
      flag = false;
      break;
    }
  }
  if (!flag) break;
}

console.log(flag ? answer : -1);
// }
