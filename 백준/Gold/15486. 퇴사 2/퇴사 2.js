let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `10
// 5 50
// 4 40
// 3 30
// 2 20
// 1 10
// 1 10
// 2 20
// 3 30
// 4 40
// 5 50`.split("\n");

let n = +input[0];
let arr = input.slice(1).map((e) => e.split(" ").map(Number));
let dp = new Array(n + 1).fill(0);
let max = 0;

for (let i = 0; i < n; i++) {
  const [t, p] = arr[i];
  max = Math.max(dp[i], max);

  if (i + t <= n) {
    dp[i + t] = Math.max(dp[i + t], max + p);
  }
}

console.log(Math.max(...dp));
