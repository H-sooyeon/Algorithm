module.exports = PriorityQueue;

function PriorityQueue(comparator) {
  this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
  this._elements = [];
}

PriorityQueue.DEFAULT_COMPARATOR = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  } else {
    a = a.toString();
    b = b.toString();

    if (a == b) return 0;

    return (a > b) ? 1 : -1;
  }
};

PriorityQueue.prototype.isEmpty = function() {
  return this.size() === 0;
};

PriorityQueue.prototype.peek = function() {
  if (this.isEmpty()) throw new Error('PriorityQueue is empty');

  return this._elements[0];
};

PriorityQueue.prototype.deq = function() {
  var first = this.peek();
  var last = this._elements.pop();
  var size = this.size();

  if (size === 0) return first;

  this._elements[0] = last;
  var current = 0;

  while (current < size) {
    var largest = current;
    var left = (2 * current) + 1;
    var right = (2 * current) + 2;

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

PriorityQueue.prototype.enq = function(element) {
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

PriorityQueue.prototype.size = function() {
  return this._elements.length;
};

PriorityQueue.prototype.forEach = function(fn) {
  return this._elements.forEach(fn);
};

PriorityQueue.prototype._compare = function(a, b) {
  return this._comparator(this._elements[a], this._elements[b]);
};

PriorityQueue.prototype._swap = function(a, b) {
  var aux = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = aux;
};

function solution(n, roads, sources, destination) {
    let answer = [];
    let arr = Array.from({length: n + 1}, () => []);
    let distance = new Array(n + 1).fill(987654321);
    
    for(let i = 0; i < roads.length; i++) {
        const [start, end] = roads[i];
        arr[start].push([end, 1]);
        arr[end].push([start, 1]);
    }
    
    const dijkstra = (start) => {
        let pq = new PriorityQueue((a, b) => b[0] - a[0]);
        
        distance[start] = 0;
        pq.enq([0, start]);
        
        while(pq.size()) {
            let [dist, now] = pq.deq();
            
            if(distance[now] < dist) continue;
            
            for(let i of arr[now]) {
                let cost = dist + i[1];
                if(cost < distance[i[0]]) {
                    distance[i[0]] = cost;
                    pq.enq([cost, i[0]]);
                }
            }
        }
    }
    
    dijkstra(destination);
    // console.log(distance);
    
    for(let i = 0; i < sources.length; i++) {
        if(distance[sources[i]] === 987654321) {
            answer.push(-1);
        }
        else {
            answer.push(distance[sources[i]]);
        }
    }
    
    return answer;
}