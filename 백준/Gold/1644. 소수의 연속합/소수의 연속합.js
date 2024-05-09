let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `1`.split("\n");

let n = Number(input[0]);
let arr = [],
  result = [];
let right = 1,
  left = 0;

for (let i = 0; i <= n; i++) {
  arr.push(i);
}

// 2부터 시작해서 특정 수의 배수에 해당하는 수를 모두 지운다. - 에라토스테네스의 체
for (let i = 2; i <= n; i++) {
  if (arr[i] === 0) continue; // 이미 지워진 수

  for (let j = 2 * i; j <= n; j += i) {
    arr[j] = 0;
  }
}

result.push(0);
for (let i = 1; i <= n; i++) {
  if (arr[i] === 1) continue;
  if (arr[i] !== 0) result.push(arr[i] + result[result.length - 1]);
}

// console.log(arr);
// console.log(result);

let answer = 0;
while (left < right && right < result.length && left < result.length) {
  let value = result[right] - result[left];

  if (value === n) {
    answer++;
    right++;
  } else if (value < n) right++;
  else if (value > n) left++;
}

console.log(answer);
