import assert from "assert";
import fs from "fs";
import path from "path";

const input =
  // `0: 3
  // 1: 2
  // 4: 4
  // 6: 4`
  fs
    .readFileSync(path.join(__dirname, "./input.txt"), "utf-8")
    .split("\n")
    .reduce((sum, i) => {
      const [index, range] = i.split(": ");
      sum[parseInt(index, 10)] = parseInt(range, 10);
      return sum;
    }, []);

let sum = 0;

for (let picosecond = 0; picosecond < input.length; picosecond++) {
  const layerIndex = picosecond;
  const layerRange = input[picosecond];
  if (!isNaN(layerRange)) {
    const layerPositionAtCurrentPicosecond = firewallLayerPositionAtPicosecond(
      layerRange,
      picosecond
    );
    if (layerPositionAtCurrentPicosecond === 0) {
      // console.log("CAUGTH AT:", picosecond);
      sum = sum + layerRange * layerIndex;
    }
  }
}

console.log("SEVERITY SUM:", sum);

/**
 * @param {number} layerRange
 * @param {number} picosecond
 * @return {number}
 */
function firewallLayerPositionAtPicosecond(layerRange, picosecond) {
  const layerCircleLength = layerRange * 2 - 2;
  const indexInLayerCircle = picosecond % layerCircleLength;
  return indexInLayerCircle < layerRange
    ? indexInLayerCircle
    : 2 * layerRange - indexInLayerCircle - 2;
}

assert.equal(firewallLayerPositionAtPicosecond(3, 0), 0);
assert.equal(firewallLayerPositionAtPicosecond(3, 1), 1);
assert.equal(firewallLayerPositionAtPicosecond(3, 2), 2);
assert.equal(firewallLayerPositionAtPicosecond(3, 3), 1);
assert.equal(firewallLayerPositionAtPicosecond(3, 4), 0);
assert.equal(firewallLayerPositionAtPicosecond(3, 5), 1);
assert.equal(firewallLayerPositionAtPicosecond(3, 6), 2);
assert.equal(firewallLayerPositionAtPicosecond(3, 7), 1);
assert.equal(firewallLayerPositionAtPicosecond(3, 8), 0);
assert.equal(firewallLayerPositionAtPicosecond(3, 9), 1);

assert.equal(firewallLayerPositionAtPicosecond(4, 0), 0);
assert.equal(firewallLayerPositionAtPicosecond(4, 1), 1);
assert.equal(firewallLayerPositionAtPicosecond(4, 2), 2);
assert.equal(firewallLayerPositionAtPicosecond(4, 3), 3);
assert.equal(firewallLayerPositionAtPicosecond(4, 4), 2);
assert.equal(firewallLayerPositionAtPicosecond(4, 5), 1);
assert.equal(firewallLayerPositionAtPicosecond(4, 6), 0);
assert.equal(firewallLayerPositionAtPicosecond(4, 7), 1);
assert.equal(firewallLayerPositionAtPicosecond(4, 8), 2);
assert.equal(firewallLayerPositionAtPicosecond(4, 9), 3);
