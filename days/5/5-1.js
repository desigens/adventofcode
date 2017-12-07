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
    arr[cursor] = arr[cursor] +  1;
    cursor = cursor + offset;
    // console.log(`STEP ${stepCounter}: cursor on arr[${cursor}]: ${arr[cursor]} ${JSON.stringify(arr)}`);
    return arr[cursor];
}

// console.log(`BEFORE: cursor on arr[${cursor}]: ${arr[cursor]} ${JSON.stringify(arr)}`);
// console.log('(0) 3  0  1  -3');
//
// step();
// console.log('(1) 3  0  1  -3');
//
// step();
// console.log('2 (3) 0  1  -3');
//
// step();
// console.log('2  4  0  1 (-3)');
//
// step();
// console.log('2 (4) 0  1  -2');
//
// step();
// console.log('2  5  0  1  -2');

let a = step();
while (a !== undefined) {
    a = step();
}

console.log('STEPS:', stepCounter);

