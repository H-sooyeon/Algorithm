let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `4 4 1
// 1 2 3 4
// 5 6 7 8
// 8 8 8 8
// 8 9 10 11
// 1 1 1`.split("\n");

// (i, j)는 (i, j-1), (i, j+1)과 인접하다.
// (i, j)는 (i-1, j), (i+1, j)와 인접하다.
// -> 상하좌우로 인접한 칸이라는 뜻

// 0은 시계 방향, 1은 반시계 방향
// 원판에 수가 남아있다면, 인접하면서 같은 수를 모두 지운다.
// 없는 경우 원판에 적ㄱ힌 수의 평균을 구하고, 평균보다 큰 수에서 1을 빼고, 작은 수에는 1을 더한다.

let [n, m, t] = input[0].split(" ").map(Number);
let arr = input.slice(1, n + 1).map((e) => e.split(" ").map(Number));
let circulate = input.slice(n + 1).map((e) => e.split(" ").map(Number));

// xi의 배수인 원판을 돌린다.
const rotate = (x, d, k) => {
  while (k--) {
    if (d === 0) {
      arr[x - 1].unshift(arr[x - 1].pop());
    } else if (d === 1) {
      arr[x - 1].push(arr[x - 1].shift());
    }
  }
};

const removeAdjacencyNum = () => {
  // 원판에 인접하면서 수가 같은 것을 모두 지운다. -> x로 둔다.
  let remove = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) continue;
      let current_flag = false;

      // 좌 확인
      if (j > 0) {
        if (arr[i][j] === arr[i][j - 1]) {
          remove.push([i, j - 1]);
          row_flag = true;
          current_flag = true;
        }
      } else {
        if (arr[i][j] === arr[i][m - 1]) {
          remove.push([i, m - 1]);
          row_flag = true;
          current_flag = true;
        }
      }
      // 우 확인
      if (j < m - 1) {
        if (arr[i][j] === arr[i][j + 1]) {
          remove.push([i, j + 1]);
          row_flag = true;
          current_flag = true;
        }
      } else {
        if (arr[i][j] === arr[i][0]) {
          remove.push([i, 0]);
          row_flag = true;
          current_flag = true;
        }
      }

      // 상 확인
      if (i > 0 && arr[i][j] === arr[i - 1][j]) {
        remove.push([i - 1, j]);
        col_flag = true;
        current_flag = true;
      }

      // 하 확인
      if (i < n - 1 && arr[i][j] === arr[i + 1][j]) {
        remove.push([i + 1, j]);
        col_flag = true;
        current_flag = true;
      }

      if (current_flag) {
        remove.push([i, j]);
      }
    }
  }

  if (!remove.length) {
    let sum = 0;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (arr[i][j] !== 0) {
          sum += arr[i][j];
          cnt += 1;
        }
      }
    }

    let avg = sum / cnt;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (arr[i][j] === 0) continue;

        if (arr[i][j] > avg) {
          arr[i][j] -= 1;
        } else if (arr[i][j] < avg) {
          arr[i][j] += 1;
        }
      }
    }
  }

  for (let i = 0; i < remove.length; i++) {
    let [row, col] = remove[i];
    arr[row][col] = 0;
  }
};

for (let i = 0; i < circulate.length; i++) {
  const [x, d, k] = circulate[i];

  for (let j = x; j <= n; j += x) {
    rotate(j, d, k);
  }

  removeAdjacencyNum();
}

// 원판에 남아있는 수의 합을 출력한다.
let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    answer += arr[i][j];
  }
}

console.log(answer);
