let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `3
// 1 1 1
// 1
// 1 2`.split("\n");

let n = +input[0];
let arr = input[1].split(" ").map(Number);
let m = +input[2];
let query = input.slice(3).map((e) => e.split(" ").map(Number));
let dp = Array.from({ length: n }, () => Array(n).fill(0));

for (let i = 0; i < n; i++) {
  dp[i][i] = 1;
}

for (let i = 0; i < n - 1; i++) {
  if (arr[i] === arr[i + 1]) {
    dp[i][i + 1] = 1;
  }
}

for (let j = 0; j < n; j++) {
  for (let i = 0; i < j; i++) {
    if (arr[i] === arr[j] && dp[i][j] === 0) {
      dp[i][j] = dp[i + 1][j - 1] === 1 ? 1 : 0;
    }
  }
}

let answer = query.map((q) => {
  const [start, end] = q;

  if (dp[start - 1][end - 1]) {
    return 1;
  } else {
    return 0;
  }
});

console.log(answer.join("\n"));
