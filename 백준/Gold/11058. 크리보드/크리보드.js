let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `12`.split("\n");

let n = +input[0];
let dp = new Array(n + 1).fill(0);

for (let i = 1; i <= 5; i++) {
  dp[i] = i;
}

for (let i = 6; i <= n; i++) {
  dp[i] = Math.max(dp[i - 4] * 3, dp[i - 3] * 2, dp[i - 5] * 4);
}

console.log(dp[n]);
