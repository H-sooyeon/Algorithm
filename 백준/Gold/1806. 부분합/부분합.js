let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `10 10
// 1 1 1 1 1 1 1 1 1 10`.split("\n");

let [n, s] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let sum = [arr[0]];

for (let i = 1; i < arr.length; i++) {
  sum.push(sum[i - 1] + arr[i]);
}

let pointer = -1;
let answer = n + 1;

if (sum[0] >= s) {
  console.log(1);
  return;
}

// console.log(sum);

for (let i = 0; i < sum.length; i++) {
  let sub = pointer > 0 ? sum[pointer] : 0;
  if (sum[i] - sub >= s) {
    let flag = false;

    if (pointer === -1) {
      pointer = 0;
    }

    while (sum[i] - sum[pointer] >= s) {
      pointer++;
      flag = true;
    }

    if (flag) {
      pointer--;
    } else if (pointer === 0) {
      pointer = -1;
    }

    answer = Math.min(answer, i - pointer);
  }
}

if (answer === n + 1) {
  answer = 0;
}
console.log(answer);
