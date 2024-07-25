let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `ACAYKP
// CAPCAK`.split("\n");

let str1 = input[0];
let str2 = input[1];
let dp = Array.from({ length: str1.length + 1 }, () =>
  Array(str2.length + 1).fill(0)
);

for (let i = 1; i <= str1.length; i++) {
  for (let j = 1; j <= str2.length; j++) {
    if (str1[i - 1] !== str2[j - 1]) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    } else {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    }
  }
}

let answer = [];
let i = str1.length;
let j = str2.length;

while (i > 0 && j > 0) {
  if (dp[i][j] === dp[i - 1][j]) {
    i--;
  } else if (dp[i][j] === dp[i][j - 1]) {
    j--;
  } else {
    answer.push(str1[i - 1]);
    i--;
    j--;
  }
}

let result = dp[str1.length][str2.length];
console.log(result);

if (result > 0) {
  console.log(answer.reverse().join(""));
}
