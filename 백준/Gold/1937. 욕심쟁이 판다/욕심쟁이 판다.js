const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const bamboo = [];

for (let i = 1; i <= n; i++) {
  bamboo.push(input[i].split(" ").map(Number));
}

const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];
const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

/**
 * 더 갈 수 있는 길이 있다면 dp[y][x] += dfs
 * 더 갈 수 있는 길이 없다면 return 1 (현재 칸)
 */

let answer = 0;
const dfs = (y, x) => {
  if (dp[y][x] !== -1) return dp[y][x];

  dp[y][x] = 1;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= n || ny < 0 || nx >= n || nx < 0) continue;
    if (bamboo[ny][nx] <= bamboo[y][x]) continue;

    dp[y][x] = Math.max(dfs(ny, nx) + 1, dp[y][x]);
  }

  return dp[y][x];
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    answer = Math.max(answer, dfs(i, j));
  }
}

console.log(answer);
