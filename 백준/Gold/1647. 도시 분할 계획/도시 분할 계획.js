let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `7 12
// 1 2 3
// 1 3 2
// 3 2 1
// 2 5 2
// 3 4 4
// 7 3 6
// 5 1 5
// 1 6 2
// 6 4 1
// 6 5 3
// 4 5 3
// 6 7 4`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let graph = [];
let parent = Array.from({ length: n + 1 }, (_, idx) => idx);
let result = 0;
let max = 0;

for (let i = 1; i < input.length; i++) {
  let [a, b, c] = input[i].split(" ").map(Number);

  graph.push([a, b, c]);
}

const findParent = (x) => {
  if (x === parent[x]) return x;
  return (parent[x] = findParent(parent[x]));
};

const unionParent = (a, b) => {
  a = findParent(a);
  b = findParent(b);

  if (a < b) parent[b] = a;
  else parent[a] = b;
};

// 간선을 비용순으로 정렬
graph.sort((a, b) => a[2] - b[2]);

// 간선을 하나씩 확인하며
for (let i = 0; i < graph.length; i++) {
  let [a, b, c] = graph[i];

  // 사이클이 발생하지 않는 경우에만 집합에 포함
  if (findParent(a) !== findParent(b)) {
    unionParent(a, b);
    result += c;
    max = Math.max(max, c);
  }
}

console.log(result - max);
