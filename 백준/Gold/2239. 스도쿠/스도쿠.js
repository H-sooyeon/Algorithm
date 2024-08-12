let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `103000509
// 002109400
// 000704000
// 300502006
// 060000050
// 700803004
// 000401000
// 009205800
// 804000107`.split("\n");

let arr = input.map((e) => e.split("").map(Number));

let zero = [];
let row = Array.from({ length: 9 }, () => Array(10).fill(false));
let col = Array.from({ length: 9 }, () => Array(10).fill(false));
let square = Array.from({ length: 9 }, () => Array(10).fill(false));

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (arr[i][j] === 0) {
      zero.push([i, j]);
    } else {
      row[i][arr[i][j]] = true;
      col[j][arr[i][j]] = true;
      square[parseInt(i / 3) * 3 + parseInt(j / 3)][arr[i][j]] = true;
    }
  }
}

function dfs(idx) {
  if (idx === zero.length) {
    let answer = arr.map((e) => e.join("")).join("\n");
    console.log(answer);
    process.exit();
  }

  const [x, y] = zero[idx];

  for (let i = 1; i <= 9; i++) {
    if (
      !row[x][i] &&
      !col[y][i] &&
      !square[parseInt(x / 3) * 3 + parseInt(y / 3)][i]
    ) {
      row[x][i] = true;
      col[y][i] = true;
      square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = true;
      arr[x][y] = i;
      dfs(idx + 1);
      arr[x][y] = 0;
      row[x][i] = false;
      col[y][i] = false;
      square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = false;
    }
  }
}

dfs(0);
// console.log(answer);
