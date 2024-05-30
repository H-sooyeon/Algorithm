let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let input = `chupikachupipichu`.split("\n");
let s = input[0];
let answer = "NO";

while (s.length) {
  if (s[0] === "p") {
    let tmp = s[0] + s[1];
    if (tmp === "pi") {
      s = s.slice(2);
    } else break;
  } else if (s[0] === "k") {
    let tmp = s[0] + s[1];
    if (tmp === "ka") {
      s = s.slice(2);
    } else break;
  } else if (s[0] === "c") {
    let tmp = s[0] + s[1] + s[2];
    if (tmp === "chu") {
      s = s.slice(3);
    } else break;
  } else {
    break;
  }
}

if (!s.length) {
  answer = "YES";
}

console.log(answer);
