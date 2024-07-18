let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `4 2
// 4 2
// 3 1`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((e) => e.split(" ").map(Number));
let graph = Array.from({ length: n + 1 }, () => []);
let indegrees = Array(n + 1).fill(0);
let queue = [];
let answer = [];

for (let [a, b] of arr) {
  graph[a].push(b);
  indegrees[b]++; // b의 진입차수 증가
}

for (let i = 1; i < n + 1; i++) {
  // 진입차수가 0인 노드를 큐에 삽입
  if (indegrees[i] === 0) queue.push(i);
}

while (queue.length) {
  let now = queue.shift();

  // 현재 노드 제거
  answer.push(now);

  // 현재 노드와 연결된 노드들의 진입차수 감소
  for (let next of graph[now]) {
    indegrees[next]--;

    if (indegrees[next] === 0) queue.push(next);
  }
}

console.log(answer.join(" "));
