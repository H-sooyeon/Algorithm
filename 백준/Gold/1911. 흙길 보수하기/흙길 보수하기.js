let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `3 3
// 1 6
// 13 17
// 8 12`.split("\n");

let [n, l] = input[0].split(" ").map(Number);
let max_value = 0;
let min_value = 987654321;
let arr = input.slice(1).map((v) => v.split(" ").map(Number));
let answer = 987654321;

arr.forEach(([start, end]) => {
  max_value = Math.max(max_value, end);
  min_value = Math.min(min_value, start);
});

arr.sort((a, b) => a[0] - b[0]);

let cnt = 0;

let idx = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = arr[i][0]; j < arr[i][1]; j++) {
    if (j <= idx) {
      j = idx;
      continue;
    }

    cnt++;

    if (j + l - 1 <= arr[i][1]) {
      idx = j + l - 1;
      j += l - 1;
    } else {
      idx = j + l - 1;
      break;
    }
  }
}

answer = Math.min(answer, cnt);

console.log(answer);
