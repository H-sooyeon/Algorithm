const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = Number(input.split("\n")[0]);
const list = input.split("\n")[1].split(" ").map(Number);

const lis = [];

const lowerBound = (arr, value) => {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] >= value) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
};

lis.push(list[0]);
for (let i = 1; i < n; i++) {
  if (lis[lis.length - 1] < list[i]) {
    lis.push(list[i]);
  } else {
    // 이분 탐색 Lower bound로 들어갈 곳 찾기
    const idx = lowerBound(lis, list[i]);
    lis[idx] = list[i];
  }
}

console.log(n - lis.length);
