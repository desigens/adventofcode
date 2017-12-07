import path from "path";
import fs from "fs";

// const input = `0
// 3
// 0
// 1
// -3`;
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const arr = input.split('\n').map(i => parseInt(i, 10));

let cursor = 0;
let stepCounter = 0;

function step() {
    stepCounter++;
    const offset = arr[cursor];
    if (offset >= 3) {
        arr[cursor] = arr[cursor] -  1;
    } else {
        arr[cursor] = arr[cursor] +  1;
    }
    cursor = cursor + offset;
    return arr[cursor];
}

let a = step();
while (a !== undefined) {
    a = step();
}

console.log('STEPS:', stepCounter);
console.log('FINAL VALUES:', JSON.stringify(arr));

