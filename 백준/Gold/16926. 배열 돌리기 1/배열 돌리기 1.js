let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `2 2 3
// 1 1
// 1 1`.split("\n");

let [n, m, r] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((v) => v.split(" ").map(Number));

let inner = 0;
let cnt = Math.min(parseInt(n / 2), parseInt(m / 2));
// console.log(cnt);
for (let rotate = 0; rotate < r; rotate++) {
  while (inner < cnt) {
    // 상단 가로
    let top_temp = 0;
    // console.log("inner", inner);
    top_temp = arr[inner][inner];
    for (let i = inner; i < m - inner - 1; i++) {
      arr[inner][i] = arr[inner][i + 1];
    }

    // console.log("상단 가로 종료 후", arr, top_temp);

    // 오른쪽 세로
    let right_temp = 0;
    right_temp = arr[inner][m - inner - 1];
    for (let i = inner; i < n - inner - 1; i++) {
      arr[i][m - inner - 1] = arr[i + 1][m - inner - 1];
    }

    // console.log("오른쪽 세로 종료 후", arr);

    // 하단 가로
    let bottom_temp = 0;
    bottom_temp = arr[n - inner - 1][m - inner - 1];
    for (let i = m - inner - 1; i > inner; i--) {
      arr[n - inner - 1][i] = arr[n - inner - 1][i - 1];
    }

    // console.log("하단 가로 종료 후", arr);

    // 왼쪽 세로
    let left_temp = 0;
    left_temp = arr[n - inner - 1][inner];
    for (let i = n - inner - 1; i > inner; i--) {
      arr[i][inner] = arr[i - 1][inner];
    }

    // console.log("왼쪽 세로 종료 후", arr);

    // console.log(inner + 1, inner, top_temp);
    arr[inner + 1][inner] = top_temp;
    // arr[inner][m - inner - 1] = right_temp;
    // console.log(n - inner - 2, m - inner - 1, bottom_temp);
    arr[n - inner - 2][m - inner - 1] = bottom_temp;

    inner++;
  }

  inner = 0;
  // console.log(arr);
}

let result = "";
arr.forEach((v) => {
  result += v.join(" ") + "\n";
});

result = result.trim();
console.log(result);
