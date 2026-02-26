const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = Number(input.split("\n")[0]);
const list = input.split("\n")[1].split(" ").map(Number);

// 1 -> 4
// 2 -> 2
// 3 -> 6
// 4 -> 3
// 5 -> 1
// 6 -> 5
// LIS, 가장 긴 증가하는 수열 문제

const lowerBounds = (arr, target) => {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] >= target) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }
  return end;
};

const lis = [list[0]];
for (let i = 1; i < list.length; i++) {
  if (lis[lis.length - 1] < list[i]) {
    lis.push(list[i]);
  } else {
    const idx = lowerBounds(lis, list[i]);
    lis[idx] = list[i];
  }
}

console.log(lis.length);
