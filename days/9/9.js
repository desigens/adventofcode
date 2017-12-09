import assert from "assert";
import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

function getScore(stream) {
  let groupsCounter = 0;
  let groupsScore = 0;
  let charsInGarbageCounter = 0;
  const groupStack = [];
  const garbageStack = [];
  let cancelFlag = false;

  // console.log(stream);

  for (let i = 0; i < stream.length; i++) {
    const char = stream.charAt(i);
    if (cancelFlag) {
      // console.log(char, "canceled");
      cancelFlag = false;
    } else {
      cancelFlag = char === "!";

      const isInGarbage = garbageStack.length;
      if (isInGarbage) {
        // console.log(char, "in garbage");
        if (char === ">") {
          garbageStack.pop();
        } else if (!cancelFlag) {
          charsInGarbageCounter++;
        }
      } else {
        switch (char) {
          case "<":
            garbageStack.push("<");
            // console.log("garbage starts");
            break;
          case "{":
            groupStack.push("{");
            // console.log("group starts");
            break;
          case "}":
            groupsCounter++;
            groupsScore = groupsScore + groupStack.length;
            groupStack.pop();
            // console.log("group closes");
            break;
        }
      }
    }
  }

  return {
    groupsCounter,
    groupsScore,
    charsInGarbageCounter
  };
}

assert.equal(getScore("{}").groupsCounter, 1);
assert.equal(getScore("{{{}}}").groupsCounter, 3);
assert.equal(getScore("{{},{}}").groupsCounter, 3);
assert.equal(getScore("{{{},{},{{}}}}").groupsCounter, 6);
assert.equal(getScore("{<{},{},{{}}>}").groupsCounter, 1);
assert.equal(getScore("{<a>,<a>,<a>,<a>}").groupsCounter, 1);
assert.equal(getScore("{{<a>},{<a>},{<a>},{<a>}}").groupsCounter, 5);
assert.equal(getScore("{{<!>},{<!>},{<!>},{<a>}}").groupsCounter, 2);

assert.equal(getScore("{}").groupsScore, 1);
assert.equal(getScore("{{{}}}").groupsScore, 6);
assert.equal(getScore("{{},{}}").groupsScore, 5);
assert.equal(getScore("{{{},{},{{}}}}").groupsScore, 16);
assert.equal(getScore("{<a>,<a>,<a>,<a>}").groupsScore, 1);
assert.equal(getScore("{{<ab>},{<ab>},{<ab>},{<ab>}}").groupsScore, 9);
assert.equal(getScore("{{<!!>},{<!!>},{<!!>},{<!!>}}").groupsScore, 9);
assert.equal(getScore("{{<a!>},{<a!>},{<a!>},{<ab>}}").groupsScore, 3);

assert.equal(getScore("<>").charsInGarbageCounter, 0);
assert.equal(getScore("<random characters>").charsInGarbageCounter, 17);
assert.equal(getScore("<<<<>").charsInGarbageCounter, 3);
assert.equal(getScore("<{!>}>").charsInGarbageCounter, 2);
assert.equal(getScore("<!!>").charsInGarbageCounter, 0);
assert.equal(getScore("<!!!>>").charsInGarbageCounter, 0);
assert.equal(getScore('<{o"i!a,<{i<a>').charsInGarbageCounter, 10);

console.log(getScore(input));
