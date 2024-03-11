// dfs로 노드 사이의 거리를 더하며 탐색하는 문제
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `4 2
// 2 1 2
// 4 3 2
// 1 4 3
// 1 2
// 3 2`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let tree = Array.from({ length: n + 1 }, () => []);
for (let i = 1; i < n; i++) {
  let [a, b, c] = input[i].split(" ").map(Number);
  tree[a].push([b, c]);
  tree[b].push([a, c]);
}
let question = input
  .slice(n, input.length)
  .map((v) => v.split(" ").map(Number));

let result = 0;
let visited = new Array(n + 1).fill(false);
const dfs = (node, end, dist) => {
  visited[node] = true;

  if (node === end) {
    result = dist;
    return;
  }

  for (let i of tree[node]) {
    if (visited[i[0]]) continue;
    dfs(i[0], end, dist + i[1]);
  }
};

let answer = [];
for (let i = 0; i < m; i++) {
  let [start, end] = question[i];
  dfs(start, end, 0);
  answer.push(result);
  visited.fill(false);
}

console.log(answer.join("\n"));
