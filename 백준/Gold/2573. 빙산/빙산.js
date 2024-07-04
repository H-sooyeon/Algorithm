let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `5 7
// 0 0 0 0 0 0 0
// 0 2 4 5 3 0 0
// 0 3 0 2 5 2 0
// 0 7 6 2 4 0 0
// 0 0 0 0 0 0 0`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((v) => v.split(" ").map(Number));
let visited = Array.from({ length: n }, () => Array(m).fill(false));
let ice = [];
let time = 0;

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] !== 0) {
      ice.push([i, j, arr[i][j]]);
    }
  }
}

let area = 0;
const dfs = (y, x) => {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
    if (visited[ny][nx] || arr[ny][nx] === 0) continue;

    dfs(ny, nx);
  }
};

let cnt = 2;
while (ice.length) {
  time++;
  let temp = [];
  let remove = [];

  for (let [y, x, _] of ice) {
    let cnt = 0;

    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];

      if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
      if (arr[ny][nx] > 0) continue;

      cnt++;
    }

    if (arr[y][x] - cnt > 0) {
      temp.push([y, x, arr[y][x] - cnt]);
    } else {
      remove.push([y, x]);
    }
  }

  for (let [y, x] of remove) {
    arr[y][x] = 0;
  }

  for (let [y, x, value] of temp) {
    arr[y][x] = value;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] !== 0 && !visited[i][j]) {
        dfs(i, j);
        area++;
      }
    }
  }

  if (area >= 2) break;

  area = 0;
  ice = temp;
  visited = Array.from({ length: n }, () => Array(m).fill(false));
}

if (area === 0) {
  console.log(0);
} else {
  console.log(time);
}
