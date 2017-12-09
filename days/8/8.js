import assert from "assert";
import path from "path";
import fs from "fs";

// const input = `b inc 5 if a > 1
// a inc 1 if b < 5
// c dec -10 if a >= 1
// c inc -20 if c == 10`;
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const rows = input.split("\n");
const registers = {};

let max;

rows.forEach(row => {
  const { target, change, value1, dependency, comparison, value2 } = parse(row);
  registers[target] = registers[target] || 0;
  registers[dependency] = registers[dependency] || 0;
  const code = `if (registers['${dependency}'] ${comparison} ${value2}) { registers['${target}'] = registers['${target}'] ${change} ${value1} }`;

  if (max === undefined || registers[target] > max) max = registers[target];

  eval(code);
});

console.log("MAX VALUE EVER:", max);
console.log("FINAL MAX VALUE:", getMax(registers));

function getMax(obj) {
  let max;
  Object.keys(obj).forEach(key => {
    if (max === undefined || obj[key] > max) max = obj[key];
  });
  return max;
}

function parse(string) {
  let [
    target,
    change,
    value1,
    a,
    dependency,
    comparison,
    value2
  ] = string.split(" ");

  value1 = parseInt(value1, 10);
  value2 = parseInt(value2, 10);
  change = {
    inc: "+",
    dec: "-"
  }[change];

  assert.equal(typeof target, "string");
  assert.equal(typeof dependency, "string");
  assert(["+", "-"].includes(change));
  assert(["==", "<=", ">=", ">", "<", "!="].includes(comparison));
  assert(!isNaN(value1));
  assert(!isNaN(value2));

  return {
    target,
    change,
    value1,
    dependency,
    comparison,
    value2
  };
}
