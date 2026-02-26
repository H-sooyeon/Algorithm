const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = Number(input);

const arr = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);

arr[1] = 0;
arr[2] = 1;
arr[3] = 1;

// bottom up
for (let i = 4; i <= n; i++) {
  arr[i] = Math.min(arr[i], 1 + arr[i - 1]);

  if (i % 2 === 0) arr[i] = Math.min(arr[i], 1 + arr[i / 2]);
  if (i % 3 === 0) arr[i] = Math.min(arr[i], 1 + arr[i / 3]);
}

console.log(arr[n]);
