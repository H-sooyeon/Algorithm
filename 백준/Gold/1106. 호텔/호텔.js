const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [c, n] = input[0].split(" ").map(Number);
const list = [];

for (let i = 1; i <= n; i++) {
  const [cost, customer] = input[i].split(" ").map(Number);
  list.push([cost, customer]);
}

const INF = Number.MAX_SAFE_INTEGER;
const dp = new Array(c + 101).fill(INF);
dp[0] = 0;

for (const [cost, customer] of list) {
  for (let i = customer; i < c + 100; i++) {
    if (dp[i - customer] !== INF) {
      dp[i] = Math.min(dp[i], dp[i - customer] + cost);
    }
  }
}

console.log(Math.min(...dp.slice(c)));
