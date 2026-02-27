let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(item) {
    this.heap.push(item);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] < this.heap[index][0]) break;

      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }
  bubbleDown() {
    let index = 0;
    let length = this.heap.length;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

const [v, e] = input[0].split(" ").map(Number);
const eList = input.slice(1, e + 1).map((line) => line.split(" ").map(Number));
const [m, x] = input[e + 1].split(" ").map(Number);
const macdonalds = input[e + 2].split(" ").map(Number);
const [s, y] = input[e + 3].split(" ").map(Number);
const starbucks = input[e + 4].split(" ").map(Number);

const INF = Number.MAX_SAFE_INTEGER;
let answer = INF;

const graph = Array.from({ length: v + 1 }, () => []);
const isStarbucks = new Array(v + 1).fill(false);
const isMacdonalds = new Array(v + 1).fill(false);

for (let macdonald of macdonalds) {
  isMacdonalds[macdonald] = true;
}
for (let star of starbucks) {
  isStarbucks[star] = true;
}

for (let ev of eList) {
  const [u, v, w] = ev;
  graph[u].push([v, w]);
  graph[v].push([u, w]);
}

const macDistance = new Array(v + 1).fill(INF);
const starDistance = new Array(v + 1).fill(INF);

const macPq = new MinHeap();
const starPq = new MinHeap();

const dijkstra = (distance, pq, list) => {
  for (let item of list) {
    pq.push([0, item]);
    distance[item] = 0;
  }

  while (!pq.isEmpty()) {
    const [dist, now] = pq.pop();

    if (distance[now] < dist) continue;

    for (let node of graph[now]) {
      // if (isStarbucks[node[0]]) continue;
      // if (isMacdonalds[node[0]]) continue;

      const cost = dist + node[1];

      if (cost < distance[node[0]]) {
        distance[node[0]] = cost;
        pq.push([cost, node[0]]);
      }
    }
  }
};

dijkstra(macDistance, macPq, macdonalds);
dijkstra(starDistance, starPq, starbucks);

for (let i = 1; i <= v; i++) {
  let dist = INF;

  if (macDistance[i] === 0 || macDistance[i] === INF) continue;
  if (starDistance[i] === 0 || starDistance[i] === INF) continue;

  if (macDistance[i] <= x && starDistance[i] <= y) {
    dist = macDistance[i] + starDistance[i];
    answer = Math.min(dist, answer);
  }
}

if (answer === INF) console.log(-1);
else console.log(answer);
