let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `6 5
// 0 1
// 1 2
// 1 3
// 0 3
// 4 5`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((e) => e.split(" ").map(Number));
let parent = Array.from({ length: n }, (_, idx) => idx);
let isCycle = false;
let answer = 0;

const findParent = (parent, x) => {
  if (parent[x] === x) return x;
  return (parent[x] = findParent(parent, parent[x]));
};

const unionParent = (parent, a, b) => {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a === b) {
    isCycle = true;
  }

  if (a < b) parent[b] = a;
  else parent[a] = b;
};

for (let i = 0; i < m; i++) {
  const [a, b] = arr[i];
  unionParent(parent, a, b);
  if (isCycle) {
    answer = i + 1;
    break;
  }
}

console.log(answer);
