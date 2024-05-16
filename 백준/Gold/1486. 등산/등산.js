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
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `8 9 4 50
// TRRVUXefk
// bSNMOWcff
// bRPNNQZip
// XSRUTVcfj
// WbZQPXZbV
// XdYSRWVOP
// feedVVcZR
// XhfdZZefg`.split("\n");

// t보다 크지 않은 곳으로만 다닐 수 있음
// d보다 크지 않은 시간 동안 올라갈 수 있는 최대 높이
let [n, m, t, d] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((v) => v.split(""));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] >= "A" && arr[i][j] <= "Z") {
      arr[i][j] = arr[i][j].charCodeAt(0) - "A".charCodeAt(0);
    } else {
      arr[i][j] = arr[i][j].charCodeAt(0) - "a".charCodeAt(0) + 26;
    }
  }
}

// console.log(arr);

const dijkstra = (y, x) => {
  let dist = Array.from({ length: n }, () => Array(m).fill(987654321));
  let pq = new PriorityQueue((a, b) => b[0] - a[0]);
  // 시작 노드로 가기 위한 최단 거리는 0으로 우선순위 큐에 삽입
  pq.enq([0, y, x]);
  dist[y][x] = 0;

  while (pq.size()) {
    let [cost, cy, cx] = pq.deq();

    if (dist[cy][cx] < cost) continue;

    for (let i = 0; i < 4; i++) {
      let ny = cy + dy[i];
      let nx = cx + dx[i];

      if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
      if (Math.abs(arr[cy][cx] - arr[ny][nx]) > t) continue;

      let nextcost =
        cost +
        (arr[cy][cx] >= arr[ny][nx]
          ? 1
          : Math.pow(arr[ny][nx] - arr[cy][cx], 2));

      if (dist[ny][nx] > nextcost) {
        dist[ny][nx] = nextcost;
        pq.enq([nextcost, ny, nx]);
      }
    }
  }
  return dist;
};

let goDist = dijkstra(0, 0);
// console.log(goDist);

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (goDist[i][j] > d) continue;
    let backDist = dijkstra(i, j);
    if (backDist[0][0] > d) continue;

    let result = backDist[0][0] + goDist[i][j];
    if (result <= d) {
      if (answer < arr[i][j]) {
        answer = arr[i][j];
      }
    }
  }
}

console.log(answer);
