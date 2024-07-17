let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `3 3
// 1 2 1
// 2 3 2
// 1 3 3`.split("\n");

// 최소 신장 트리
let [v, e] = input[0].split(" ").map(Number);
let graph = [];
let parent = Array.from({ length: v + 1 }, (_, index) => index);
let result = 0;

const findParent = (x) => {
  // 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
  // console.log("x:", x, " parent:", parent[x]);
  // console.log(parent[x]);
  if (x === parent[x]) return x;
  return (parent[x] = findParent(parent[x]));
};

// 두 원소가 속한 집합 합치기
const unionParent = (a, b) => {
  a = findParent(a);
  b = findParent(b);

  if (a < b) parent[b] = a;
  else parent[a] = b;
};

for (let i = 1; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);

  graph.push([a, b, c]);
  // graph[b].push([a, c]);
}

// 간선을 비용순으로 오름차순 정렬
graph.sort((a, b) => a[2] - b[2]);

// console.log(graph);
// 간선을 하나씩 확인하며
for (let i = 0; i < graph.length; i++) {
  const [a, b, cost] = graph[i];

  // 사이클이 발생하지 않는 경우에만 집합으로 포함
  if (findParent(a) !== findParent(b)) {
    unionParent(a, b);
    result += cost;
  }
}

console.log(result);
