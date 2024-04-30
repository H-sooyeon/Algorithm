let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `4
// -100 -2 -1 103`.split("\n");

let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);

let left = arr[0];
let right = arr[arr.length - 1];

for (let i = 0; i < arr.length; i++) {
  let start = i + 1;
  let end = n - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = arr[i] + arr[mid];

    // console.log(items, arr[mid], mid, arr[start], start, arr[end], end);
    if (Math.abs(sum) < Math.abs(left + right)) {
      left = arr[i];
      right = arr[mid];
    }

    if (sum === 0) {
      break;
    } else if (sum > 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    // console.log(start, end);
  }
}

console.log(left, right);
