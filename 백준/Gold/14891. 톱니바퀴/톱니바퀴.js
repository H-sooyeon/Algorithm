let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `10010011
// 01010011
// 11100011
// 01010101
// 8
// 1 1
// 2 1
// 3 1
// 4 1
// 1 -1
// 2 -1
// 3 -1
// 4 -1`.split("\n");

// 톱니바퀴를 회전시켰을 때 그 옆에 있는 톱니바퀴의 맞닿은 톱니의 극이 다르면 회전시킨 톱니와 반대방향으로 회전시킨다.
// 극이 같으면 회전시키지 않는다.

let gear = [];
gear.push(input[0].split("").map(Number));
gear.push(input[1].split("").map(Number));
gear.push(input[2].split("").map(Number));
gear.push(input[3].split("").map(Number));

let k = Number(input[4]);
let arr = input.slice(5).map((el) => el.split(" ").map(Number));
let visited = new Array(4).fill(false);
let answer = 0;

// console.log(gear);

const rotate = (gear_num, dir) => {
  if (dir === 1) {
    // console.log("시계 방향", gear_num, dir);
    let temp = gear[gear_num].pop();
    gear[gear_num].unshift(temp);
  } else {
    // console.log("반시계 방향", gear_num, dir);
    let temp = gear[gear_num].shift();
    gear[gear_num].push(temp);
  }
};

const check = (gear_num, dir) => {
  // console.log("check", gear_num, dir);
  // 오른쪽 톱니바퀴를 확인
  if (gear_num !== 3 && !visited[gear_num + 1]) {
    // console.log("오른쪽 톱니바퀴", gear_num, gear_num + 1);
    // console.log(gear[gear_num], gear[gear_num + 1]);
    if (gear[gear_num][2] !== gear[gear_num + 1][6]) {
      // console.log("달라", gear[gear_num][2], gear[gear_num + 1][6]);
      visited[gear_num + 1] = true;

      check(gear_num + 1, dir * -1);
      // 오른쪽 톱니바퀴 회전 후 해당 톱니바퀴를 기준으로 돌릴 톱니바퀴 있는지 확인
      rotate(gear_num + 1, dir * -1);
    }
  }

  // 왼쪽 톱니바퀴를 확인
  if (gear_num !== 0 && !visited[gear_num - 1]) {
    // console.log("왼쪽 톱니바퀴", gear_num, gear_num - 1);
    if (gear[gear_num][6] !== gear[gear_num - 1][2]) {
      // console.log("달라", gear[gear_num][6], gear[gear_num - 1][2]);
      visited[gear_num - 1] = true;

      check(gear_num - 1, dir * -1);
      // 왼쪽 톱니바퀴 회전 후 해당 톱니바퀴를 기준으로 돌릴 톱니바퀴 있는지 확인
      rotate(gear_num - 1, dir * -1);
    }
  }
  // console.log(gear);
};

// 1은 시계방향, -1은 반시계방향
for (let i = 0; i < arr.length; i++) {
  let [num, dir] = arr[i];
  visited = new Array(4).fill(false);

  // console.log("다음 회전!", num, dir);
  visited[num - 1] = true;
  // console.log("visited", visited);
  check(num - 1, dir);
  rotate(num - 1, dir);
}

answer += gear[0][0] === 1 ? 1 : 0;
answer += gear[1][0] === 1 ? 2 : 0;
answer += gear[2][0] === 1 ? 4 : 0;
answer += gear[3][0] === 1 ? 8 : 0;

console.log(answer);
