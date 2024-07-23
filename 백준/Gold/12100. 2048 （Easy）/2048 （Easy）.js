let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `4
// 2 4 16 8
// 8 4 0 0
// 16 8 2 0
// 2 8 2 0`.split("\n");

let n = +input[0];
let arr = input.slice(1).map((e) => e.split(" ").map(Number));
let answer = 0;

function getAccumulatedArray(arr) {
  const result = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) continue;

    if (arr[i] === arr[i + 1]) {
      result.push(arr[i] * 2);
      arr[i + 1] = 0;
    } else {
      result.push(arr[i]);
    }
  }
  if (arr[arr.length - 1] !== 0) result.push(arr[arr.length - 1]);

  return result;
}

function pushLeft(array) {
  for (let i = 0; i < n; i++) {
    const arr = [];

    for (let j = 0; j < n; j++) {
      if (array[i][j] !== 0) {
        arr.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    if (arr.length > 0) {
      const result = getAccumulatedArray(arr);

      for (let j = 0; j < result.length; j++) {
        array[i][j] = result[j];
      }
    }
  }
  return array;
}

function pushRight(array) {
  for (let i = 0; i < n; i++) {
    const arr = [];

    for (let j = n - 1; j >= 0; j--) {
      if (array[i][j] !== 0) {
        arr.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    if (arr.length > 0) {
      const result = getAccumulatedArray(arr);

      for (let j = 0; j < result.length; j++) {
        array[i][n - 1 - j] = result[j];
      }
    }
  }
  return array;
}

function pushUp(array) {
  for (let j = 0; j < n; j++) {
    const arr = [];

    for (let i = 0; i < n; i++) {
      if (array[i][j] !== 0) {
        arr.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    if (arr.length > 0) {
      const result = getAccumulatedArray(arr);

      for (let i = 0; i < result.length; i++) {
        array[i][j] = result[i];
      }
    }
  }
  return array;
}

function pushDown(array) {
  for (let j = 0; j < n; j++) {
    const arr = [];

    for (let i = n - 1; i >= 0; i--) {
      if (array[i][j] !== 0) {
        arr.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    if (arr.length > 0) {
      const result = getAccumulatedArray(arr);

      for (let i = 0; i < result.length; i++) {
        array[n - 1 - i][j] = result[i];
      }
    }
  }
  return array;
}

function copyArray(array) {
  let arr = [];

  array.forEach((v) => {
    arr.push([...v]);
  });
  return arr;
}

const dfs = (arr, cnt) => {
  if (cnt === 5) {
    let max = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        max = Math.max(max, arr[i][j]);
      }
    }

    answer = Math.max(answer, max);
    return;
  }

  let copy = copyArray(arr);
  copy = pushLeft(copy);
  dfs(copy, cnt + 1);

  copy = copyArray(arr);
  copy = pushRight(copy);
  dfs(copy, cnt + 1);

  copy = copyArray(arr);
  copy = pushUp(copy);
  dfs(copy, cnt + 1);

  copy = copyArray(arr);
  copy = pushDown(copy);
  dfs(copy, cnt + 1);
};

dfs(arr, 0);

console.log(answer);
