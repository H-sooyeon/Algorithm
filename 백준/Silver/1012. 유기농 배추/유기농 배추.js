let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `1
// 5 3 6
// 0 2
// 1 2
// 2 2
// 3 2
// 4 2
// 4 0`.split("\n");

let testCase = Number(input[0]);
let answer = "";

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

const dfs = (y, x, arr, visited, n, m) => {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;
    if (arr[ny][nx] === 0 || visited[ny][nx]) continue;

    dfs(ny, nx, arr, visited, n, m);
  }
};

let line = 1;
for (let t = 0; t < testCase; t++) {
  let [m, n, k] = input[line].split(" ").map(Number);
  let arr = Array.from({ length: n }, () => Array(m).fill(0));
  let visited = Array.from({ length: n }, () => Array(m).fill(false));

  let result = 0;

  for (let i = line + 1; i < k + line + 1; i++) {
    let [x, y] = input[i].split(" ").map(Number);
    arr[y][x] = 1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 1 && !visited[i][j]) {
        result++;
        dfs(i, j, arr, visited, n, m);
      }
    }
  }
  line += k + 1;
  answer += result + "\n";
}

answer = answer.slice(0, -1);
console.log(answer);
