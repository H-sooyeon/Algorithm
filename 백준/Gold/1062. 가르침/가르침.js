let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// let input = `2 25
// antatica
// antaztica`.split("\n");

let [n, k] = input[0].split(" ").map(Number);
let words = input.slice(1);
let add_char_list = new Set();
let result_words = [];

if (k < 5) {
  console.log(0);
  return;
}

if (k === 26) {
  console.log(n);
  return;
}

k -= 5;

let alpha = Array(26).fill(false);
const remove = ["a", "n", "t", "i", "c"];

const isAntic = (word) => {
  if (remove.includes(word)) return true;
  return false;
};

for (let word of words) {
  let s = word.slice(4, word.length - 4);
  let str = "";

  for (let i = 0; i < s.length; i++) {
    if (isAntic(s[i])) continue;
    str += s[i];
  }

  result_words.push(str);
  for (let i = 0; i < str.length; i++) {
    add_char_list.add(str[i]);
  }
}

let max = 0;
add_char_list = Array.from(add_char_list);

if (k > add_char_list.length) {
  console.log(n);
  return;
}

const dfs = (idx, select_char_list) => {
  if (select_char_list.length === k) {
    let count = 0;
    alpha = Array(26).fill(false);

    for (let char of select_char_list) {
      alpha[char.charCodeAt() - 97] = true;
    }

    for (let word of result_words) {
      let flag = true;

      for (let i = 0; i < word.length; i++) {
        if (!alpha[word[i].charCodeAt() - 97]) {
          flag = false;
          break;
        }
      }

      if (flag) count++;
    }

    max = Math.max(max, count);
    return;
  }

  for (let i = idx; i < add_char_list.length; i++) {
    select_char_list.push(add_char_list[i]);
    dfs(i + 1, select_char_list);
    select_char_list.pop();
  }
};

dfs(0, [], 0);
console.log(max);
