import assert from "assert";
import path from "path";
import fs from "fs";

export default function knotHash(inputAsString) {
  const listLength = 256;

  const lengths = toASCIICodesWithSuffix(inputAsString).map(i =>
    parseInt(i, 10)
  );
  let list = Array.from({ length: listLength }).map((i, index) => index);

  let roundsCounter = 0;
  let listCursorPosition = 0;
  let lengthsCursorPosition = 0;
  let skipSize = 0;

  function step() {
    const lengthToReverse = lengths[lengthsCursorPosition];
    list = arrIndexToStart(list, listCursorPosition);
    list = arrReversePart(list, lengthToReverse);
    list = arrStartToIndex(list, listCursorPosition);
    listCursorPosition = nextPosition(
      list,
      listCursorPosition,
      lengthToReverse + skipSize
    );
    lengthsCursorPosition = nextPosition(lengths, lengthsCursorPosition, 1);
    skipSize++;
    if (lengthsCursorPosition === 0) {
      roundsCounter++;
    }
  }

  while (roundsCounter < 64) {
    step();
  }

  const denseHash = [];
  while (list.length) {
    const a = list.splice(0, 16);
    denseHash.push(xor(a));
  }

  const denseHashHEX = denseHash.reduce((sum, i) => {
    sum = sum + ("0" + i.toString(16)).slice(-2);
    return sum;
  }, "");

  return denseHashHEX;
}

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

/**
 * @param {number[]} arr
 * @return {number}
 */
function xor(arr) {
  return arr.reduce((sum, i) => {
    sum = i ^ sum;
    return sum;
  }, 0);
}

/**
 * @param {string} input
 * @return {number[]}
 */
function toASCIICodes(input) {
  return input.split("").map(s => s.charCodeAt());
}

/**
 * @param {string} input
 * @return {number[]}
 */
function toASCIICodesWithSuffix(input) {
  return [...toASCIICodes(input), ...[17, 31, 73, 47, 23]];
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
// prettier-ignore
assert.equal(
    xor([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22]),
    64
);
// prettier-ignore
assert.deepEqual(
    toASCIICodes("1,2,3"), [49, 44, 50, 44, 51]
);
// prettier-ignore
assert.deepEqual(
    toASCIICodesWithSuffix("1,2,3"), [49,  44,  50,  44,  51,  17,  31,  73,  47,  23]
);
