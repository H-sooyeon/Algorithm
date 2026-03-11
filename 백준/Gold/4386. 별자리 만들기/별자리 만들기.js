const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const stars = [];
const parents = new Array(n);

for (let i = 1; i <= n; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  stars.push([y, x]);
}

for (let i = 0; i < n; i++) {
  parents[i] = i;
}

const findParent = (x) => {
  if (parents[x] === x) return x;
  return (parents[x] = findParent(parents[x]));
};

const unionParent = (a, b) => {
  const parentA = findParent(a);
  const parentB = findParent(b);

  if (parentA < parentB) parents[parentB] = parentA;
  else parents[parentA] = parentB;
};

const edges = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const dist = Math.sqrt(Math.pow(stars[i][0] - stars[j][0], 2) + Math.pow(stars[i][1] - stars[j][1], 2));
    edges.push([i, j, dist]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

let answer = 0;
for (const [u, v, cost] of edges) {
  if (findParent(u) !== findParent(v)) {
    unionParent(u, v);
    answer += cost;
  }
}

console.log(answer.toFixed(2));
