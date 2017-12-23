import assert from "assert";

import knotHash from "../10/knot-hash";

const testInput = "flqrgnkx";

let testGrid = "";
for (let i = 0; i < 8; i++) {
  testGrid += binary(knotHash(testInput + "-" + i)).slice(0, 8);
  testGrid += "\n";
}

function binary(hexString) {
  return hexString
    .split("")
    .map(i => ("000" + parseInt(i, 16).toString(2)).slice(-4))
    .join("");
}

assert.equal(binary("a0c2017"), "1010000011000010000000010111");
assert.equal(
  testGrid,
  `##.#.#..
.#.#.#.#
....#.#.
#.#.##.#
.##.#...
##..#..#
.#...#..
##.#.##.
`
    .replace(/#/gi, "1")
    .replace(/\./gi, "0")
);

// const input = testInput;
const input = "oundnydw";
let usedCounter = 0;
for (let i = 0; i < 128; i++) {
  binary(knotHash(input + "-" + i))
    .split("")
    .forEach(i => {
      if (i === "1") usedCounter++;
    });
}

console.log("USED SQUARES:", usedCounter);
