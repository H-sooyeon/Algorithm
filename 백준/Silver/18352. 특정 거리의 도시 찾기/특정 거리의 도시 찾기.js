let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `4 4 1 1
// 1 2
// 1 3
// 2 3
// 2 4`.split("\n");

let [n, m, k, x] = input[0].split(" ").map(Number);
let graph = Array.from({ length: n + 1 }, () => []);
let visited = new Array(n + 1).fill(false);

for (let i = 1; i < m + 1; i++) {
  let [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
}

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  push(item) {
    this.items[this.tail] = item;
    this.tail++;
  }
  pop() {
    delete this.items[this.head];
    this.head++;
  }
  size() {
    return this.tail - this.head;
  }
  front() {
    return this.items[this.head];
  }
}

let answer = [];
let queue = new Queue();
queue.push([x, 0]);
visited[x] = true;

while (queue.size()) {
  let [cur, dist] = queue.front();
  queue.pop();

  if (dist === k) {
    answer.push(cur);
    continue;
  }

  for (let next of graph[cur]) {
    if (visited[next]) continue;
    queue.push([next, dist + 1]);
    visited[next] = true;
  }
}

if (answer.length) {
  answer.sort((a, b) => a - b);
  console.log(answer.join("\n"));
} else {
  console.log(-1);
}
