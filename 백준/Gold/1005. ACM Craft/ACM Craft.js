let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `5
// 3 2
// 1 2 3
// 3 2
// 2 1
// 1
// 4 3
// 5 5 5 5
// 1 2
// 1 3
// 2 3
// 4
// 5 10
// 100000 99999 99997 99994 99990
// 4 5
// 3 5
// 3 4
// 2 5
// 2 4
// 2 3
// 1 5
// 1 4
// 1 3
// 1 2
// 4
// 4 3
// 1 1 1 1
// 1 2
// 3 2
// 1 4
// 4
// 7 8
// 0 0 0 0 0 0 0
// 1 2
// 1 3
// 2 4
// 3 4
// 4 5
// 4 6
// 5 7
// 6 7
// 7`.split("\n");

let testCase = +input[0];
let answer = "";

let line = 1;
for (let t = 0; t < testCase; t++) {
  let [n, k] = input[line++].split(" ").map(Number);
  let build_time_list = input[line++].split(" ").map(Number);
  let accumulate_time = new Array(n + 1).fill(0); // 노드까지의 누적 시간을 저장할 배열
  let graph = Array.from({ length: n + 1 }, () => []); // 진출 노드를 저장할 배열
  let inDegree = new Array(n + 1).fill(0); // 진입 차수를 저장할 배열

  for (let i = 0; i < k; i++) {
    let [a, b] = input[line++].split(" ").map(Number);

    graph[a].push(b);
    inDegree[b]++; // 진입차수 증가
  }

  let w = +input[line++]; // 목표로 하는 노드

  // 진입 차수가 0인 모든 노드를 큐에 넣는다.
  let queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      accumulate_time[i] = build_time_list[i - 1];
    }
  }

  // 큐가 빌 때까지 다음의 과정을 반복한다.
  // 큐에서 원소를 꺼내 해당 노드에서 나가는 간선을 그래프에서 감소시킨다.
  // 해당 노드의 빌드 시간과 다음 노드의 누적 빌드 시간을 비교하여 갱신한다.
  // 새롭게 진입차수가 0이 된 노드를 큐에 넣는다.
  // 새롭게 진입차수가 0이 된 노드가 w라면 누적 빌드 시간을 출력하고 종료한다.
  while (queue.length) {
    let node = queue.shift();

    if (node === w) {
      answer += accumulate_time[node] + "\n";
      break;
    }

    // 현재 노드와 연결된 노드들의 진입차수 감소
    for (let next of graph[node]) {
      inDegree[next]--;

      // 누적 시간 갱신
      accumulate_time[next] = Math.max(
        accumulate_time[node] + build_time_list[next - 1],
        accumulate_time[next]
      );

      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
}

console.log(answer.trim());
