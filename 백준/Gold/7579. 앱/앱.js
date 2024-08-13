let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `5 60
// 30 10 20 35 40
// 3 0 3 5 4`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let active = input[1].split(" ").map(Number);
let cost = input[2].split(" ").map(Number);

let sum = cost.reduce((acc, cur) => acc + cur, 0);
let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= sum; j++) {
    if (cost[i - 1] <= j) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - cost[i - 1]] + active[i - 1]
      );
      if (j > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
      }
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

let answer = 0;
for (let i = 0; i <= sum; i++) {
  if (dp[n][i] >= m) {
    answer = i;
    break;
  }
}

console.log(answer);
