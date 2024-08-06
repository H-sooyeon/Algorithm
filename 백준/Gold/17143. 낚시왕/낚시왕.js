let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `4 6 8
// 4 1 3 3 8
// 1 3 5 2 9
// 2 4 8 4 1
// 4 5 0 1 4
// 3 3 1 2 7
// 1 5 8 4 3
// 3 6 2 1 2
// 2 2 2 3 5`.split("\n");

let [r, c, m] = input[0].split(" ").map(Number);
let arr = Array.from({ length: r + 1 }, () => Array(c + 1).fill([]));
let sharks = {};

if (m === 0) {
  console.log(0);
  return;
}

for (let i = 1; i < input.length; i++) {
  const [r, c, s, d, z] = input[i].split(" ").map(Number);

  arr[r][c] = [i];

  sharks[i] = {
    y: r,
    x: c,
    speed: s,
    dir: d,
    size: z,
  };
}

// 1인 경우는 위, 2인 경우는 아래, 3인 경우는 오른쪽, 4인 경우는 왼쪽
const dy = [0, -1, 1, 0, 0];
const dx = [0, 0, 0, 1, -1];
let answer = 0;

// 같은 위치에 상어가 있는지 확인
const checkSharks = () => {
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      if (arr[i][j].length > 1) {
        // 사이즈가 더 큰 상어가 나머지 다 잡아먹음

        let maxId = arr[i][j][0];
        let maxValue = +sharks[arr[i][j][0]].size;

        arr[i][j].forEach((id) => {
          const size = +sharks[id].size;
          if (maxValue < size) {
            // 잡아먹힌 상어 제거
            delete sharks[maxId];
            maxId = id;
            maxValue = size;
          } else if (maxValue > size) {
            delete sharks[id];
          }
        });

        arr[i][j] = [maxId];
      }
    }
  }
};

// 상어 이동
const moveShark = () => {
  // 일단 모든 상어 이동
  for (let [key, value] of Object.entries(sharks)) {
    let { y, x, speed, dir } = value;
    key = +key;
    speed = +speed;
    dir = +dir;

    // 현재 위치에서 제거
    const list = arr[y][x];
    const idx = list.indexOf(key);
    arr[y][x].splice(idx, 1);

    let ny = +y;
    let nx = +x;
    const loop = dir <= 2 ? speed % (2 * (r - 1)) : speed % (2 * (c - 1));
    for (let i = 0; i < loop; i++) {
      ny += dy[dir];
      nx += dx[dir];

      if (ny > r || ny < 1 || nx > c || nx < 1) {
        // 반대로 이동
        ny -= dy[dir] * 2;
        nx -= dx[dir] * 2;

        // 방향 바꾸기
        if (dir === 1) dir = 2;
        else if (dir === 2) dir = 1;
        else if (dir === 3) dir = 4;
        else if (dir === 4) dir = 3;
      }
    }

    // 위치 옮기기
    const temp = [...arr[ny][nx]];
    temp.push(key);
    arr[ny][nx] = temp;

    sharks[key] = {
      ...sharks[key],
      y: ny,
      x: nx,
      dir: dir,
    };
  }

  // 같은 위치에 있는 상어는 큰 상어가 잡아먹음
  checkSharks();
};

// 낚시왕이 있는 열에서 가장 가까운 상어 찾기
const findShark = (col) => {
  for (let i = 1; i <= r; i++) {
    if (arr[i][col].length > 0) {
      const id = arr[i][col];
      answer += +sharks[id].size;
      delete sharks[id];
      arr[i][col] = [];

      break;
    }
  }
};

// 두 상어가 같은 칸에 존재하면 크기가 더 큰 상어가 작은 상어를 잡아먹는다.
for (let i = 1; i <= c; i++) {
  findShark(i);
  moveShark();
}

// console.log(arr);
console.log(answer);
