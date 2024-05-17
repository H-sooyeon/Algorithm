let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `9
// -1 0 0 2 2 4 4 6 6
// 4`.split("\n");

let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let remove = Number(input[2]);

let tree = Array.from({ length: n }, (_, idx) => ({
  node: idx,
  parent: -1,
  child: [],
  check: false,
}));

let root = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] !== -1) {
    tree[i].parent = arr[i];
    tree[arr[i]].child.push(i);
  } else root = i;
}

tree[remove].check = true;
let removeNode = [remove];
while (removeNode.length) {
  let child = tree[remove].child;
  removeNode.push(...child);

  if (removeNode.length > 0) removeNode.shift();

  for (let i = 0; i < child.length; i++) {
    tree[child[i]].check = true;
  }

  if (removeNode.length) remove = removeNode[0];
}

let answer = 0;
for (let i = 0; i < tree.length; i++) {
  if (tree[i].check) {
    continue;
  }
  if (tree[i].child.length === 0) answer++;
  if (tree[i].child.length === 1 && tree[tree[i].child[0]].check) answer++;
}

console.log(answer);
