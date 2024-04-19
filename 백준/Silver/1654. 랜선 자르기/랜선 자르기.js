let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `4 11
// 802
// 743
// 457
// 539`.split("\n");

let [k, n] = input[0].split(" ").map(Number);
let arr = input.slice(1).map(Number);

// 이분 탐색
let left = 1;
let right = Math.max(...arr);
let result = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let cnt = 0;
  for (let i = 0; i < k; i++) {
    cnt += Math.floor(arr[i] / mid);
  }

  if (cnt < n) {
    right = mid - 1;
  } else {
    left = mid + 1;
    result = Math.max(result, mid);
  }
}

console.log(result);
