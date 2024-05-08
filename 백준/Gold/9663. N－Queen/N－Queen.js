let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `8`.split("\n");

let n = Number(input[0]);
let selected = [];
let answer = 0;

const check = (y, x) => {
  // 놓았던 퀸을 확인
  for (let [a, b] of selected) {
    if (a === y || b === x) return false;
    if (Math.abs(a - y) === Math.abs(b - x)) return false;
  }

  return true;
};

const dfs = (y) => {
  if (y === n) {
    answer++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (check(y, i)) {
      selected.push([y, i]);
      dfs(y + 1);
      selected.pop();
    }
  }
};

dfs(0);
console.log(answer);
