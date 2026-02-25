const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = Number(input.split("\n")[0]);
const list = input.split("\n")[1].split(" ").map(Number);
const m = Number(input.split("\n")[2]);

let answer = -1;

let left = 0;
let right = Math.max(...list) + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2); // 상한액

  const value = list.reduce((acc, cur) => {
    if (mid >= cur) return acc + cur;
    return acc + mid;
  }, 0);

  if (value > m) {
    right = mid;
  } else {
    answer = mid;
    left = mid + 1;
  }
}

console.log(answer);
