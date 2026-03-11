const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [m, n] = input[0].split(" ").map(Number);
const list = [];

for (let i = 1; i <= m; i++) {
  const heights = input[i].split(" ").map(Number);
  list.push(heights);
}

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const dp = Array.from({ length: m }, () => new Array(n).fill(-1));
dp[0][0] = 1;

const dfs = (y, x) => {
  if (dp[y][x] > -1) return dp[y][x];

  dp[y][x] = 0;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= m || ny < 0 || nx >= n || nx < 0) continue;
    if (list[ny][nx] <= list[y][x]) continue;

    const value = dfs(ny, nx);
    dp[y][x] += value;
  }
  return dp[y][x];
};

dp[m - 1][n - 1] = dfs(m - 1, n - 1);

console.log(dp[m - 1][n - 1]);
