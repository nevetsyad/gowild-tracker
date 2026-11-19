import assert from "node:assert/strict";
import { search } from "./search.js";

const denSan = search({ from: "DEN", to: "SAN", dayOffset: 0, stops: "any" });
assert.equal(denSan.length, 1);
assert.equal(denSan[0].kind, "connection");
assert.equal(denSan[0].via, "LAS");
assert.equal(denSan[0].seats, 4);

const nonstopOnly = search({ from: "DEN", to: "SAN", dayOffset: 0, stops: "nonstop" });
assert.equal(nonstopOnly.length, 0);

const anywhere = search({ from: "DEN", to: "ANY", dayOffset: 0, stops: "nonstop" });
assert.ok(anywhere.length >= 4);
assert.ok(anywhere.every((item) => item.kind === "nonstop"));

const denCun = search({ from: "DEN", to: "CUN", dayOffset: 1, stops: "any" });
assert.equal(denCun.length, 1);
assert.equal(denCun[0].via, "MCO");
assert.equal(denCun[0].seats, 4);

const tooTight = search({ from: "DEN", to: "CUN", dayOffset: 0, stops: "any" });
assert.equal(tooTight.length, 0);

console.log("search checks passed");
