let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `5 3
// 1
// 2
// 8
// 4
// 9`.split("\n");

let [n, c] = input[0].split(" ").map(Number);
let arr = input.slice(1).map(Number);
arr.sort((a, b) => a - b);

let left = 0;
let right = arr[n - 1] - arr[0];
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let start = arr[0];
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (arr[i] - start >= mid) {
      count++;
      start = arr[i];
    }
  }

  if (count >= c) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
