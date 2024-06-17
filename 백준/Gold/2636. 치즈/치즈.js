let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `13 12
// 0 0 0 0 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 0 1 1 0 0 0
// 0 1 1 1 0 0 0 1 1 0 0 0
// 0 1 1 1 1 1 1 0 0 0 0 0
// 0 1 1 1 1 1 0 1 1 0 0 0
// 0 1 1 1 1 0 0 1 1 0 0 0
// 0 0 1 1 0 0 0 1 1 0 0 0
// 0 0 1 1 1 1 1 1 1 0 0 0
// 0 0 1 1 1 1 1 1 1 0 0 0
// 0 0 1 1 1 1 1 1 1 0 0 0
// 0 0 1 1 1 1 1 1 1 0 0 0
// 0 0 0 0 0 0 0 0 0 0 0 0`.split("\n");

let [n, m] = input[0].split(" ").map(Number);

let arr = input.slice(1).map((v) => v.split(" ").map(Number));
let visited = Array.from({ length: n }, () => Array(m).fill(false));
let cheese = 0;

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === 1) {
      cheese++;
    }
  }
}

const dfs = (y, x) => {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;
    if (visited[ny][nx]) continue;

    if (arr[ny][nx] === 1) {
      cheese--;
      arr[ny][nx] = 0;
      visited[ny][nx] = true;
    }

    if (!visited[ny][nx]) {
      dfs(ny, nx);
    }
  }
};

let time = 0;
let lastCheese = 0;
let flag = false;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === 0 && !visited[i][j]) {
      lastCheese = cheese;
      dfs(i, j);
      time++;

      visited = Array.from({ length: n }, () => Array(m).fill(false));

      if (cheese === 0) {
        flag = true;
        break;
      }
    }
  }
  if (flag) break;
}

console.log(time + "\n" + lastCheese);
