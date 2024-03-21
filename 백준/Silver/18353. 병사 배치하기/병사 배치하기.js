let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `7
// 15 11 4 8 5 2 4`.split("\n");

let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let dp = new Array(n);

for (let i = 0; i < n; i++) {
  dp[i] = 1;
  for (let j = 0; j <= i; j++) {
    if (arr[i] < arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

let answer = Math.max(...dp);
console.log(n - answer);
