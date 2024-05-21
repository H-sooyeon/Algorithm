let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `5 3
// 0 0 1 0 0
// 0 0 2 0 1
// 0 1 2 0 0
// 0 0 1 0 0
// 0 0 0 0 2`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1).map((v) => v.split(" ").map(Number));
let chicken = [];
let house = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 1) house.push([i, j]);
    if (map[i][j] === 2) chicken.push([i, j]);
  }
}

let answer = 987654321;
const combi = (b, start, k) => {
  if (b.length === k) {
    let sum = 0;
    for (let [hy, hx] of house) {
      let min = 987654321;
      for (let idx of b) {
        min = Math.min(
          min,
          Math.abs(chicken[idx][1] - hx) + Math.abs(chicken[idx][0] - hy)
        );
      }
      sum += min;
    }
    answer = Math.min(answer, sum);
    return;
  }

  for (let i = start + 1; i < chicken.length; i++) {
    b.push(i);
    combi(b, i, k);
    b.pop();
  }
};

combi([], -1, m);

console.log(answer);
