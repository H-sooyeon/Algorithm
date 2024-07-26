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

function solution(n, paths, gates, summits) {
    // 출발지에서 목적지로 가는데 사이클이 없어야 함. (visited)
    // 목적지에서 출발지로 오는데 사이클이 없어야 함. (visited)
    
    // 최단거리 알고리즘 적용하면서 가중치 확인 (모든 출발지에 대해 최단거리 알고리즘 실행)
    let answer = [];
    let graph = Array.from({length: n + 1}, () => []);
    
    paths.forEach((path) => {
        const [a, b, cost] = path;
        
        graph[a].push([b, cost]);
        graph[b].push([a, cost]);
    })
    
    summits.forEach((v) => {
        graph[v] = [];
    })
    
    let distance = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    
    const dijkstra = (start) => {
        let pq = new PriorityQueue((a, b) => b[0] - a[0]);
        
        // 시작 노드로 가기 위한 최단 거리는 0으로 우선순위 큐에 삽입
        if(start) {
            pq.enq([0, start]);
            distance[start] = 0;
        } else {
            gates.forEach((v) => {
                pq.enq([0, v]);
                distance[v] = 0;
            })
        }
        
        while(pq.size()) {
            let [dist, now] = pq.deq();
            
            if(distance[now] < dist) continue;
            
            for(let i of graph[now]) {
                let cost = Math.max(dist, i[1]);
                
                if(cost < distance[i[0]]) {
                    distance[i[0]] = cost;
                    pq.enq([cost, i[0]]);
                }
            }
        }
    }
    
    // 출발지에서 산봉우리까지 가는 객체리스트
    let route = {};
        dijkstra();
        
        let arrive = summits.map((summit) => {
            if(route[summit]) {
                route[summit].push([0, distance[summit]])
            } else {
                route[summit] = [[0, distance[summit]]];
            }
            
            return [summit, distance[summit]];
        });
    
    distance = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    for(let [key, value] of Object.entries(route)) {
        dijkstra(key);
        
        for(let i = 0; i < value.length; i++) {
            const [start, cost] = value[i];
            let result = [+key, Math.max(distance[key], cost)];
            answer.push(result);
        }
    }
    
    answer.sort((a, b) => {
        if(a[1] === b[1]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    })
        
    return answer[0];
}