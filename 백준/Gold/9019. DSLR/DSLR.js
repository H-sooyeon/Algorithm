const input = require("fs")
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
}

const t = Number(input[0]);
const answer = [];

for (let i = 1; i <= t; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  const queue = new Queue();
  queue.push([a, ""]);
  const visited = new Array(10000).fill(false);
  visited[a] = true;

  while (queue.size() > 0) {
    const [value, command] = queue.pop();

    if (value === b) {
      answer.push(command);
      break;
    }

    for (let oper of ["D", "S", "L", "R"]) {
      let nextValue;
      if (oper === "D") nextValue = (value * 2) % 10000;
      if (oper === "S") nextValue = value === 0 ? 9999 : value - 1;
      if (oper === "L") nextValue = (value % 1000) * 10 + Math.floor(value / 1000);
      if (oper === "R") nextValue = (value % 10) * 1000 + Math.floor(value / 10);

      if (!visited[nextValue]) {
        visited[nextValue] = true;
        queue.push([nextValue, command + oper]);
      }
    }
  }
}

console.log(answer.join("\n"));
