let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `2
// 7
// 3 1 3 7 3 4 6
// 8
// 1 2 3 4 5 6 7 8`.split("\n");

let testCase = +input[0];
let visited;
let graph;
let finished;
let cnt = 0;

function dfs(node) {
  visited[node] = true;
  const next = graph[node];

  if (!visited[next]) dfs(next);
  else if (!finished[next]) {
    for (let i = next; i !== node; i = graph[i]) {
      cnt += 1;
    }

    cnt += 1;
  }

  finished[node] = true;
}

let line = 1;
let result = [];
for (let t = 0; t < testCase; t++) {
  let n = +input[line++];
  let arr = input[line++].split(" ").map(Number);
  graph = [0, ...arr];
  visited = Array(n + 1).fill(false);
  // graph = Array.from({ length: n + 1 }, () => []);
  finished = Array(n + 1).fill(false);

  // arr.forEach((v, idx) => {
  //   graph[idx + 1].push(v);
  //   // graph[v].push(idx + 1);
  // });

  let answer = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  result.push(n - cnt);
  cnt = 0;
}

console.log(result.join("\n"));
