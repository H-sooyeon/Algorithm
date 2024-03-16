let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `8 900
// 0 10 9
// 20 60 45
// 80 190 100
// 50 70 15
// 160 180 14
// 140 160 14
// 420 901 5
// 450 900 0`.split("\n");

let [n, d] = input[0].split(" ").map(Number);
let set = new Set();
let shortList = new Map();

for (let i = 1; i <= n; i++) {
  let [start, end, dist] = input[i].split(" ").map(Number);
  if (end - start < dist) continue;
  if (end > d) continue;

  if (shortList.has(JSON.stringify({ start, end }))) {
    let tmp = shortList.get(JSON.stringify({ start, end }));
    shortList.set(JSON.stringify({ start, end }), Math.min(tmp, dist));
  } else {
    shortList.set(JSON.stringify({ start, end }), dist);
  }

  set.add(start);
  set.add(end);
}
set.add(d);

let arr = Array.from(set).sort((a, b) => a - b);
let dp = new Array(arr.length);

for (let i = 0; i < dp.length; i++) {
  dp[i] = arr[i];
}

// console.log(shortList);
// console.log(set);

for (let i = 0; i < dp.length; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (shortList.has(JSON.stringify({ start: arr[j], end: arr[i] }))) {
      // console.log(`${dp[j]}에서 ${dp[i]}까지 가는게 있음`);
      dp[i] = Math.min(
        dp[i],
        dp[j] + shortList.get(JSON.stringify({ start: arr[j], end: arr[i] }))
      );
      // console.log(`값 계산해서 결과가 ${arr[i]}은 ${dp[i]}가 됨`);
    } else {
      dp[i] = Math.min(dp[i], dp[j] + arr[i] - arr[j]);
    }
  }
}

console.log(dp[dp.length - 1]);
