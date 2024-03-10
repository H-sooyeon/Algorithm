// 백트래킹
// 재료를 사용할지 말지 결정하는 문제

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `4
// 1 7
// 2 6
// 3 8
// 4 9`.split("\n");

let n = Number(input[0]);
let ingredient = input.slice(1).map((v) => v.split(" ").map(Number));
let visited = new Array(n).fill(false);

let answer = 1e9;

const dfs = (idx) => {
  if (idx === n) {
    return;
  }

  for (let i = idx; i < n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      let sour = 1;
      let bitter = 0;

      for (let j = 0; j < n; j++) {
        if (visited[j]) {
          sour *= ingredient[j][0];
          bitter += ingredient[j][1];
        }
      }

      let diff = Math.abs(sour - bitter);
      answer = Math.min(answer, diff);

      dfs(i + 1);
      visited[i] = false;
    }
  }
};

dfs(0);
console.log(answer);
