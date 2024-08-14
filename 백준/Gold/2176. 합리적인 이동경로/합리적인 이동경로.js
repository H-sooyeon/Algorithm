function PriorityQueue(comparator) {
  this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
  this._elements = [];
}

PriorityQueue.DEFAULT_COMPARATOR = function (a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else {
    a = a.toString();
    b = b.toString();

    if (a == b) return 0;

    return a > b ? 1 : -1;
  }
};

PriorityQueue.prototype.isEmpty = function () {
  return this.size() === 0;
};

PriorityQueue.prototype.peek = function () {
  if (this.isEmpty()) throw new Error("PriorityQueue is empty");

  return this._elements[0];
};

PriorityQueue.prototype.deq = function () {
  var first = this.peek();
  var last = this._elements.pop();
  var size = this.size();

  if (size === 0) return first;

  this._elements[0] = last;
  var current = 0;

  while (current < size) {
    var largest = current;
    var left = 2 * current + 1;
    var right = 2 * current + 2;

    if (left < size && this._compare(left, largest) >= 0) {
      largest = left;
    }

    if (right < size && this._compare(right, largest) >= 0) {
      largest = right;
    }

    if (largest === current) break;

    this._swap(largest, current);
    current = largest;
  }

  return first;
};

PriorityQueue.prototype.enq = function (element) {
  var size = this._elements.push(element);
  var current = size - 1;

  while (current > 0) {
    var parent = Math.floor((current - 1) / 2);

    if (this._compare(current, parent) <= 0) break;

    this._swap(parent, current);
    current = parent;
  }

  return size;
};

PriorityQueue.prototype.size = function () {
  return this._elements.length;
};

PriorityQueue.prototype.forEach = function (fn) {
  return this._elements.forEach(fn);
};

PriorityQueue.prototype._compare = function (a, b) {
  return this._comparator(this._elements[a], this._elements[b]);
};

PriorityQueue.prototype._swap = function (a, b) {
  var aux = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = aux;
};

let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `4 4
// 1 3 1
// 3 2 2
// 1 4 2
// 2 4 1`.split("\n");

let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((e) => e.split(" ").map(Number));

let graph = Array.from({ length: n + 1 }, () => []);
let dp = Array.from({ length: n + 1 }, () => -1);
let s = 1;
let t = 2;

for (let i = 0; i < m; i++) {
  const [a, b, c] = arr[i];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

let distance = Array.from({ length: n + 1 }, () => Infinity);
distance[t] = 0;

const dijkstra = (start) => {
  let pq = new PriorityQueue((a, b) => a[1] - b[1]);
  pq.enq([0, start]);
  distance[start] = 0;

  while (pq.size()) {
    // 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    let [dist, now] = pq.deq();
    // 현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distance[now] < dist) continue;
    // 현재 노드와 연결된 다른 인접한 노드들 확인
    for (let i of graph[now]) {
      let cost = i[1] + dist;
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        pq.enq([cost, i[0]]);
      }
    }
  }
};

const findPathCnt = (node) => {
  if (node === t) return 1;
  if (dp[node] !== -1) return dp[node];

  let cnt = 0;
  for (let i of graph[node]) {
    if (distance[node] > distance[i[0]]) {
      cnt += findPathCnt(i[0]);
    }
  }

  return (dp[node] = cnt);
};

dijkstra(t);
console.log(findPathCnt(s));
