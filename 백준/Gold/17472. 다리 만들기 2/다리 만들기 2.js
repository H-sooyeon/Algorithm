let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.items = {};
    this.tail = 0;
    this.head = 0;
  }
  push(item) {
    this.items[this.tail] = item;
    this.tail += 1;
  }
  pop() {
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head += 1;
    return item;
  }
  size() {
    return this.tail - this.head;
  }
  sort() {
    const sorted = Object.values(this.items).sort((a, b) => {
      return a[a.length - 1] - b[b.length - 1];
    });
    this.items = sorted;
  }
}

const [n, m] = input[0].split(" ").map(Number);
const graph = input.slice(1).map((row) => row.split(" ").map(Number));

/**
 * 라인별로 몇 개의 섬이 있는지를 탐색
 * 1. 섬과 섬을 연결해야 하므로 라인에 최소 2개의 섬이 있어야 함
 * 2. 다리 길이는 최소 2 이상이어야 하므로 한 라인에 여러 섬이 있는 경우 다리 길이가 2 이상인 경우만 저장
 * 3. 탐색이 가능한 경우에 대해 큐에 넣어 정렬
 * 4. 사이클이 발생하면 안되므로 섬의 번호로 배열을 만들어 parents 배열 생성
 * 5. MST 탐색
 */

/**
 * dfs 활용
 * 라인에 섬이 몇 개 있는지에 대해선 dfs 활용
 * 최대 20번의 dfs 탐색 진행
 *
 * 먼저 그래프 전체에 대해서 섬 번호 지정
 * 섬 번호는 최대 5
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const island = Array.from({ length: n }, () => new Array(m).fill(0));

// 섬 번호 붙이기
const numberingIsland = (num, visited, y, x) => {
  visited[y][x] = true;
  island[y][x] = num;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
    if (graph[ny][nx] === 0 || visited[ny][nx]) continue;

    numberingIsland(num, visited, ny, nx);
  }
};

// 섬 번호 붙이기
let num = 1;
const visited = Array.from({ length: n }, () => new Array(m).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 1 && island[i][j] === 0) {
      numberingIsland(num, visited, i, j);
      num += 1;
    }
  }
}

const queue = new Queue();
let edgeMap = new Map();

// 가로 라인 확인
for (let r = 0; r < n; r++) {
  let prev = 0;
  let dist = 0;

  for (let c = 0; c < m; c++) {
    if (island[r][c] === 0) {
      if (prev !== 0) dist++;
    } else {
      if (prev !== 0 && prev !== island[r][c] && dist >= 2) {
        const a = Math.min(prev, island[r][c]);
        const b = Math.max(prev, island[r][c]);
        const key = `${a},${b}`;

        if (!edgeMap.has(key) || edgeMap.get(key) > dist) {
          edgeMap.set(key, dist);
        }
      }
      prev = island[r][c];
      dist = 0;
    }
  }
}

// 세로 라인 확인
for (let c = 0; c < m; c++) {
  let prev = 0;
  let dist = 0;

  for (let r = 0; r < n; r++) {
    if (island[r][c] === 0) {
      if (prev !== 0) dist++;
    } else {
      if (prev !== 0 && prev !== island[r][c] && dist >= 2) {
        const a = Math.min(prev, island[r][c]);
        const b = Math.max(prev, island[r][c]);
        const key = `${a},${b}`;

        if (!edgeMap.has(key) || edgeMap.get(key) > dist) {
          edgeMap.set(key, dist);
        }
      }
      prev = island[r][c];
      dist = 0;
    }
  }
}

for (const [key, value] of edgeMap) {
  const [a, b] = key.split(",").map(Number);
  queue.push([a, b, value]);
}

// MST 탐색
const parents = new Array(num);

for (let i = 0; i < num; i++) {
  parents[i] = i;
}

const findParent = (x) => {
  if (parents[x] === x) return x;
  return (parents[x] = findParent(parents[x]));
};

const unionParent = (a, b) => {
  const parentA = findParent(a);
  const parentB = findParent(b);

  if (parentA < parentB) parents[parentB] = parentA;
  else parents[parentA] = parentB;
};

// queue 비용 오름차순 정렬
queue.sort();

let answer = 0;
let pathCnt = 0;
num -= 1;

while (queue.size() > 0) {
  const [a, b, w] = queue.pop();

  if (findParent(a) !== findParent(b)) {
    unionParent(a, b);
    pathCnt += 1;
    answer += w;
  }
}

// 연결이 다 안됐는데 answer가 0이 아닐 수도 있음
// MST 간선 개수 = 노드 개수 - 1
if (pathCnt !== num - 1) console.log(-1);
else console.log(answer);
