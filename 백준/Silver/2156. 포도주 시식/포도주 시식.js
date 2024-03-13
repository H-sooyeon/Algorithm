let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `6
// 6
// 10
// 13
// 9
// 8
// 1`.split("\n");

let n = Number(input[0]);
let wines = input.slice(1).map(Number);

let dp = new Array(n + 1).fill(0);

dp[0] = wines[0];
dp[1] = wines[0] + wines[1];
dp[2] = Math.max(wines[0] + wines[2], wines[1] + wines[2], wines[0] + wines[1]);

for (let i = 3; i < n; i++) {
  dp[i] = dp[i - 1]; // i번째 포도주를 안마시는 경우
  dp[i] = Math.max(dp[i], dp[i - 2] + wines[i]); // i번째 마시고 앞에 있는거 안마시는 경우
  dp[i] = Math.max(dp[i], dp[i - 3] + wines[i - 1] + wines[i]); // i번째 마시고 바로 앞에거 마시는 경우
}

console.log(dp[n - 1]);
