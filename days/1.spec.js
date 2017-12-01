import { assert } from "chai";

import { solveCaptcha, solveCaptcha2 } from "./1";

describe("Day 1, part 1", () => {
  it("1122", () => {
    assert.equal(solveCaptcha("1122"), 3);
  });

  it("1111", () => {
    assert.equal(solveCaptcha("1111"), 4);
  });

  it("1234", () => {
    assert.equal(solveCaptcha("1234"), 0);
  });

  it("91212129", () => {
    assert.equal(solveCaptcha("91212129"), 9);
  });
});

describe("Day 1, part 2", () => {
  it("1212", () => {
    assert.equal(solveCaptcha2("1212"), 6);
  });

  it("1221", () => {
    assert.equal(solveCaptcha2("1221"), 0);
  });

  it("123425", () => {
    assert.equal(solveCaptcha2("123425"), 4);
  });

  it("123123", () => {
    assert.equal(solveCaptcha2("123123"), 12);
  });

  it("12131415", () => {
    assert.equal(solveCaptcha2("12131415"), 4);
  });
});
