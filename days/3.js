import assert from "assert";

/**
 * @param {number} squareIndex
 * @return {number}
 */
function getCircleOfSpiralForSquare(squareIndex) {
  // Every (N+1)^2 + 1 is new circle
  // Nearest square root (last item on circle of spiral):
  const s = Math.ceil(Math.sqrt(squareIndex));
  return Math.floor(s / 2);
}

assert.equal(getCircleOfSpiralForSquare(8), 1);
assert.equal(getCircleOfSpiralForSquare(1), 0);
assert.equal(getCircleOfSpiralForSquare(10), 2);
assert.equal(getCircleOfSpiralForSquare(19), 2);
assert.equal(getCircleOfSpiralForSquare(30), 3);
assert.equal(getCircleOfSpiralForSquare(80), 4);
assert.equal(getCircleOfSpiralForSquare(81), 4);
assert.equal(getCircleOfSpiralForSquare(82), 5);
assert.equal(getCircleOfSpiralForSquare(625), 12);
assert.equal(getCircleOfSpiralForSquare(626), 13);

/**
 * @param {number} circleIndex
 * @return {number[]}
 */
function createSequenceOfStepsForCircle(circleIndex) {
  const result = [];

  const LENGTH = 8 * circleIndex || 1;
  const MIN_VALUE = circleIndex;
  const MAX_VALUE = circleIndex * 2;

  let directionDown = true;
  let index = 0;
  let currentValue = MAX_VALUE - 1 >= 0 ? MAX_VALUE - 1 : 0;

  for (index; index < LENGTH; index++) {
    result.push(currentValue);

    if (directionDown && currentValue > MIN_VALUE) {
      currentValue = currentValue - 1;
    } else {
      currentValue = currentValue + 1;
    }

    if (currentValue === MAX_VALUE) {
      directionDown = true;
    }

    if (currentValue === MIN_VALUE) {
      directionDown = false;
    }
  }

  return result;
}

// prettier-ignore
assert.deepEqual(createSequenceOfStepsForCircle(0), [0]);
// prettier-ignore
assert.deepEqual(createSequenceOfStepsForCircle(1), [1, 2, 1, 2, 1, 2, 1, 2]);
// prettier-ignore
assert.deepEqual(createSequenceOfStepsForCircle(2), [3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4]);
// prettier-ignore
assert.deepEqual(createSequenceOfStepsForCircle(3), [5, 4, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6]);
// prettier-ignore
assert.deepEqual(createSequenceOfStepsForCircle(4), [7, 6, 5, 4, 5, 6, 7, 8, 7, 6, 5, 4, 5, 6, 7, 8, 7, 6, 5, 4, 5, 6, 7, 8, 7, 6, 5, 4, 5, 6, 7, 8]);

/**
 * @param {number} circleIndex
 * @return {number}
 */
function getFirstSquareInCircle(circleIndex) {
  if (circleIndex === 0) return 1;
  return Math.pow(2 * circleIndex - 1, 2) + 1;
}

/**
 * @param {number} squareIndex
 * @return {number}
 */
function getPositionInCircleForSquare(squareIndex) {
  return (
    squareIndex -
    getFirstSquareInCircle(getCircleOfSpiralForSquare(squareIndex))
  );
}

assert.equal(getPositionInCircleForSquare(1), 0);
assert.equal(getPositionInCircleForSquare(10), 0);
assert.equal(getPositionInCircleForSquare(27), 1);
assert.equal(getPositionInCircleForSquare(25), 15);

/**
 * @param {number} squareIndex
 * @return {number}
 */
function getStepsFromSquareToCenter(squareIndex) {
  const circle = getCircleOfSpiralForSquare(squareIndex);
  const wave = createSequenceOfStepsForCircle(circle);
  const index = getPositionInCircleForSquare(squareIndex);
  return wave[index];
}

assert.equal(getStepsFromSquareToCenter(1), 0);
assert.equal(getStepsFromSquareToCenter(12), 3);
assert.equal(getStepsFromSquareToCenter(15), 2);
assert.equal(getStepsFromSquareToCenter(22), 3);
assert.equal(getStepsFromSquareToCenter(23), 2);
assert.equal(getStepsFromSquareToCenter(1024), 31);
assert.equal(getStepsFromSquareToCenter(1025), 32);

console.log("Steps:", getStepsFromSquareToCenter(289326));

/*
                            57
37  36  35  34  33  32  31  56
38  17  16  15  14  13  30  55
39  18   5   4   3  12  29  54
40  19   6   1   2  11  28  53
41  20   7   8   9  10  27  52
42  21  22  23  24  25  26  51
43  44  45  46  47  48  49  50

range   cicle       last in cicle   steps
1       0   0N+1    1^2             0
2-9     1   1N+1    3^2             1   2   1   2   1   2   1   2
10-25   2   2N+1    5^2             3   2   3   4   3   2   3   4   3   2   3   4   3   2   3   4
26-49   3   3N+1    7^2             5   4   3   4   5   6   5   4   3   4   5   6   5   4   3   4   5   6   5   4   3   4   5   6
50-81   4   4N+1    9^2             7   6   5   4   5   6   7   8   7   6   5   4   5   6   7   8   7   6   5   4   5   6   7   8   7   6   5   4   5   6   7   8
        5            11(^2)
        6            13(^2)
        7            15(^2)
        8            17(^2)
        9            19(^2)
        10           21(^2)
        11           23(^2)
->625   12           25(^2)

*/
