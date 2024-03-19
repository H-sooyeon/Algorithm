let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

// let input = `3 3
// 011
// 111
// 110`.split("\n");

let [m, n] = input[0].split(" ").map(Number);
let maze = input.slice(1).map((v) => v.split("").map(Number));

let queue = new PriorityQueue((a, b) => b[2] - a[2]);
let visited = Array.from(Array(n), () => Array(m).fill(false));
queue.enq([0, 0, 0]);
visited[0][0] = true;

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let answer = 1e9;
while (queue.size()) {
  let [y, x, breakCnt] = queue.deq();

  if (y === n - 1 && x === m - 1) {
    answer = Math.min(answer, breakCnt);
    break;
  }

  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;
    if (visited[ny][nx]) continue;

    if (maze[ny][nx] === 0) {
      queue.enq([ny, nx, breakCnt]);
      visited[ny][nx] = true;
    } else {
      queue.enq([ny, nx, breakCnt + 1]);
      visited[ny][nx] = true;
    }
  }
}

console.log(answer);
