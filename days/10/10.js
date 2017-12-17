import assert from "assert";
import path from "path";
import fs from "fs";

const inputAsString = fs.readFileSync(
  path.join(__dirname, "./input.txt"),
  "utf-8"
);
const listLength = 256;

// const inputAsString = "3, 4, 1, 5";
// const listLength = 5;

const lengths = inputAsString.split(",").map(i => parseInt(i, 10));
let list = Array.from({ length: listLength }).map((i, index) => index);

let listCursorPosition = 0;
let lengthsCursorPosition = 0;
let skipSize = 0;

function step() {
  // console.log(
  //   `position ${listCursorPosition} (on ${list[listCursorPosition]})`
  // );

  const lengthToReverse = lengths[lengthsCursorPosition];

  list = arrIndexToStart(list, listCursorPosition);
  list = arrReversePart(list, lengthToReverse);
  list = arrStartToIndex(list, listCursorPosition);

  // console.log('AFTER STEP', lengthsCursorPosition , list, lengthToReverse);

  listCursorPosition = nextPosition(
    list,
    listCursorPosition,
    lengthToReverse + skipSize
  );
  lengthsCursorPosition++;
  skipSize++;
}

while (lengths[lengthsCursorPosition] !== undefined) {
  step();
}

console.log("RESULT:", list[0] * list[1]);

/**
 * @param {number[]} arr
 * @param {number} index
 * @return {number[]}
 */
function arrIndexToStart(arr, index) {
  return [...arr.slice(index), ...arr.slice(0, index)];
}

/**
 * @param {number[]} arr
 * @param {number} index
 * @return {number[]}
 */
function arrStartToIndex(arr, index) {
  return [
    ...arr.slice(arr.length - index),
    ...arr.slice(0, arr.length - index)
  ];
}

/**
 * @param {number[]} arr
 * @param length
 * @return {number[]}
 */
function arrReversePart(arr, length) {
  const a = [...arr];
  const b = a.splice(0, length);
  return [...b.reverse(), ...a];
}

/**
 * @param {number[]} arr
 * @param {number} currentPosition
 * @param {number} offset
 * @return {number}
 */
function nextPosition(arr, currentPosition, offset) {
  return (currentPosition + offset) % arr.length;
}

// prettier-ignore
assert.deepEqual(
  arrIndexToStart([0, 1, 2, 3, 4, 5, 6], 5), [5,  6,  0,  1,  2,  3,  4]
);
// prettier-ignore
assert.deepEqual(
  arrStartToIndex([5, 6, 0, 1, 2, 3, 4], 5), [0, 1, 2, 3, 4, 5, 6]
);
// prettier-ignore
assert.deepEqual(
  arrReversePart([5, 6, 0, 1, 2, 3, 4], 4), [1,  0,  6,  5,  2,  3,  4]
);
// prettier-ignore
assert.equal(
  nextPosition([0, 1, 2, 3, 4, 5, 6], 4, 5), 2
);
// prettier-ignore
assert.equal(
  nextPosition([0, 1, 2, 3, 4, 5, 6], 1, 3), 4
);
