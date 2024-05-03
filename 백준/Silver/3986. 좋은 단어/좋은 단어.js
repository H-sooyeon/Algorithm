let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `1
// ABBABB`.split("\n");

let n = Number(input[0]);
let arr = input.slice(1);
let answer = 0;

for (let i = 0; i < n; i++) {
  let stack = [];
  for (let j = 0; j < arr[i].length; j++) {
    if (stack.length && stack[stack.length - 1] === arr[i][j]) {
      stack.pop();
    } else {
      stack.push(arr[i][j]);
    }
  }

  if (!stack.length) answer++;
  stack = [];
}

console.log(answer);
