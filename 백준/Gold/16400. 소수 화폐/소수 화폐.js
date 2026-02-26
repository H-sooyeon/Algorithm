const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = Number(input);

// 먼저 n까지의 소수를 찾는다.
const isPrime = new Array(n + 1).fill(true);
isPrime[1] = false;

for (let i = 2; i <= Math.sqrt(n); i++) {
  if (!isPrime[i]) continue;
  for (let j = i; i * j <= n; j++) {
    isPrime[i * j] = false;
  }
}

const primes = [];
for (let i = 2; i <= n; i++) {
  if (isPrime[i]) primes.push(i);
}

const dp = new Array(n + 1).fill(0);

// 0원을 만드는 방법은 아무것도 내지 않는 1가지
dp[0] = 1;

for (let prime of primes) {
  for (let i = prime; i <= n; i++) {
    dp[i] = (dp[i] + dp[i - prime]) % 123456789;
  }
}

console.log(dp[n]);
