import assert from "assert";
import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

// const input2 = `0 <-> 2
// 1 <-> 1
// 2 <-> 0, 3, 4
// 3 <-> 2, 4
// 4 <-> 2, 3, 6
// 5 <-> 6
// 6 <-> 4, 5`;

const roots = {};

function parse(str) {
  str.split("\n").map(row => {
    const [a, b] = row.split(" <-> ");
    const c = b.split(", ");
    c.forEach(i => {
      link(i, a);
    });
  });
}

function link(q, p) {
    roots[q] = roots[q] || q;
    roots[p] = roots[p] || p;
    roots[root(q)] = root(p);
}

function root(q) {
  while (q !== roots[q]) {
    q = roots[q];
  }
  return q;
}

// parse(input2);
// assert(check('2', '0'));
// assert(check('3', '0'));
// assert(check('4', '0'));
// assert(check('4', '6'));
// assert.equal(check('1', '2'), false);

parse(input);

const n = root('0');
const groups = {};
const x = Object.keys(roots).reduce((sum, i) => {
    groups[root(i)] = true;
    if (root(i) === n) sum++;
    return sum;
}, 0);

console.log('ZERO GROUP NUMBER:', x);
console.log('GROUPS NUMBER:', Object.keys(groups).length);
