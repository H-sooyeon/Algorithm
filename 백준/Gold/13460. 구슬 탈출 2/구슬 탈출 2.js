let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `3 10
// ##########
// #.O....RB#
// ##########`.split("\n");

// 각각의 동작에서 공은 동시에 움직인다.
// 빨간 구슬와 파란 구슬이 동시에 구멍에 빠져도 실패
// 빨간 구슬과 파란 구슬은 동시에 같은 칸에 있을 수 없다.

let [n, m] = input[0].split(" ").map(Number);
let board = input.slice(1).map((e) => e.split(""));
let cnt = 0;
let answer = Number.MAX_SAFE_INTEGER;
let arrive = [];
let red = [];
let blue = [];
let visited = {};

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "O") {
      arrive = [i, j];
    } else if (board[i][j] === "R") {
      red = [i, j];
    } else if (board[i][j] === "B") {
      blue = [i, j];
    }
  }
}

let queue = [];
queue.push([red, blue, cnt]);
visited[[...red, ...blue].toString()] = true;

while (queue.length > 0) {
  let [r, b, c] = queue.shift();

  if (c > 10) {
    break;
  }

  if (r[0] === arrive[0] && r[1] === arrive[1]) {
    answer = Math.min(c, answer);
    break;
  }

  for (let i = 0; i < 4; i++) {
    let red = r.slice();
    let blue = b.slice();
    let cnt = c;

    let redMove = 0;
    let blueMove = 0;

    while (board[red[0] + dy[i]][red[1] + dx[i]] !== "#") {
      red[0] += dy[i];
      red[1] += dx[i];
      redMove++;
      if (board[red[0]][red[1]] === "O") {
        break;
      }
    }

    while (board[blue[0] + dy[i]][blue[1] + dx[i]] !== "#") {
      blue[0] += dy[i];
      blue[1] += dx[i];
      blueMove++;
      if (board[blue[0]][blue[1]] === "O") {
        break;
      }
    }

    if (blue[0] === arrive[0] && blue[1] === arrive[1]) {
      continue;
    }

    if (red[0] === blue[0] && red[1] === blue[1]) {
      if (redMove > blueMove) {
        red[0] -= dy[i];
        red[1] -= dx[i];
      } else {
        blue[0] -= dy[i];
        blue[1] -= dx[i];
      }
    }

    if (visited[[...red, ...blue].toString()]) {
      continue;
    }

    visited[[...red, ...blue].toString()] = true;
    cnt++;
    queue.push([red, blue, cnt]);
  }
}

if (answer === Number.MAX_SAFE_INTEGER) {
  console.log(-1);
} else {
  console.log(answer);
}
