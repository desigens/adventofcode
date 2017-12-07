import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const fails = input.split("\n").reduce((invalidsCounter, line, lines) => {
  let isInvalid = false;
  line.split(" ").reduce((chunksCache, chunk) => {
    if (chunksCache[chunk]) {
      isInvalid = true;
    }
    chunksCache[chunk] = true;
    return chunksCache;
  }, {});
  if (isInvalid) invalidsCounter++;
  return invalidsCounter;
}, 0);

console.log('Valid passphrases:', input.split("\n").length - fails);
