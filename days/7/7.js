// const input = `pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)`;

//                gyxo
//               /
//          ugml - ebii
//        /      \
//       |         jptl
//       |
//       |         pbga
//      /        /
// tknk --- padx - havc
//      \        \
//       |         qoyq
//       |
//       |         ktlj
//        \      /
//          fwft - cntj
//               \
//                 xhth

import path from "path";
import fs from "fs";
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const rows = input.split("\n");

const parents = {};
const children = {};
const els = [];
const weights = {};

rows.forEach(row => {
  const el = row.split(" ")[0];
  if (row.indexOf("-> ") > -1) {
    children[el] = row.split("-> ")[1].split(", ");
    children[el].forEach(child => {
      parents[child] = el;
    });
  }
  els.push(el);
  weights[el] = parseInt(
    row.substr(row.indexOf("(") + 1, row.indexOf(")") - row.indexOf("(") - 1)
  );
});

let root;
els.forEach(el => {
  if (!parents[el]) {
    root = el;
    console.log(`NO PARENT FOR: ${el} (IS ROOT)`);
  }
});

weights["sphbbz"] = weights["sphbbz"] - 9;
console.log("WEIGHT OF sphbbz SHOULD BE:", weights["sphbbz"]);

getNodeWeight(root);

function getNodeWeight(el) {
  if (!children[el]) {
    return weights[el];
  } else {
    const childrenWeights = children[el].map(child => getNodeWeight(child));
    if (!isArrayOfEquals(childrenWeights)) {
      console.log(
        `NODE ${el} HAS DISBALANCED CHILDREN (${childrenWeights}): ${JSON.stringify(
          children[el]
        )}`
      );
    }
    return childrenWeights.reduce((s, i) => s + i, weights[el]);
  }
}

function isArrayOfEquals(arr) {
  let e;
  let res = true;
  arr.forEach(a => {
    if (e && a !== e) res = false;
    e = a;
  });
  return res;
}
