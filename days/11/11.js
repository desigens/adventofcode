import assert from "assert";
import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const axes = {
  x: 0,
  y: 0,
  z: 0
};

let maxDistance = 0;

function doStep(direction) {
  switch (direction) {
    case "n":
      axes.y++;
      axes.z--;
      break;
    case "ne":
      axes.x++;
      axes.z--;
      break;
    case "se":
      axes.x++;
      axes.y--;
      break;
    case "s":
      axes.z++;
      axes.y--;
      break;
    case "sw":
      axes.z++;
      axes.x--;
      break;
    case "nw":
      axes.y++;
      axes.x--;
      break;
  }

  // console.log(axes);
}

function reset() {
  axes.x = 0;
  axes.y = 0;
  axes.z = 0;
}

function getDistance({ x, y, z }) {
  return Math.max(Math.abs(0 - x), Math.abs(0 - y), Math.abs(0 - z));
}

function hexJourney(string) {
  string.split(",").forEach(i => {
    doStep(i);
    maxDistance = Math.max(maxDistance, getDistance(axes));
  });
  const steps = getDistance(axes);
  reset();
  return steps;
}

assert.equal(hexJourney("ne,ne,ne"), 3); // ne,ne,ne
assert.equal(hexJourney("ne,ne,sw,sw"), 0);
assert.equal(hexJourney("ne,ne,s,s"), 2); // se,se
assert.equal(hexJourney("ne,ne,s,s,ne"), 3);
assert.equal(hexJourney("ne,ne,s,s,ne,s"), 3);
assert.equal(hexJourney("ne,ne,s,s,ne,s,ne"), 4);
assert.equal(hexJourney("ne,ne,s,s,ne,s,s"), 4);
assert.equal(hexJourney("ne,ne,s,s,ne,s,sw"), 3);
assert.equal(hexJourney("ne,ne,s,s,ne,s,sw,nw"), 2);
assert.equal(hexJourney("ne,ne,s,s,ne,s,sw,nw,n"), 1);
assert.equal(hexJourney("se,sw,se,sw,sw"), 3); // s,s,sw

console.log("FINAL DISTANCE:", hexJourney(input));
console.log("MAX DISTANCE:", maxDistance);
