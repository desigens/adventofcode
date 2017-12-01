import Benchmark from "benchmark";

import {
  solveCaptcha,
  solveCaptchaForCharAt,
  solveCaptchaForSubstr,
  input
} from "./days/1";

new Benchmark.Suite()
  .add("Reduce", () => {
    solveCaptcha(input);
  })
  .add("For substring", () => {
    solveCaptchaForCharAt(input);
  })
  .add("For charAt", () => {
    solveCaptchaForSubstr(input);
  })
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: false });
