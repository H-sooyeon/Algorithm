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

function solution(n, edge) {
    let answer = 0;
    let arr = Array.from(Array(n + 1), () => []);
    const distance = new Array(n + 1).fill(1e9);
    
    for(let i = 0; i < edge.length; i++) {
        let [a, b] = edge[i];
        arr[a].push([b]);
        arr[b].push([a]);
    }
    
    const dijkstra = () => {
        let pq = new PriorityQueue((a, b) => b[0] - a[0]);
        pq.enq([0, 1]);
        distance[1] = 0;
        
        while(pq.size()) {
            let [dist, now] = pq.deq();
            if(distance[now] < dist) continue;
            
            for(let i of arr[now]) {
                let cost = dist + 1;
                
                if(cost < distance[i]) {
                    distance[i] = cost;
                    pq.enq([cost, i]);
                }
            }
        }
        
        distance[0] = 0;
        let maxValue = Math.max(...distance);
        return maxValue;
    }
    
    let maxValue = dijkstra();
    for(let i = 1; i < distance.length; i++) {
        if(distance[i] === maxValue) {
            answer++;
        }
    }
    
    return answer;
}