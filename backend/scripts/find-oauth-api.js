"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const s = fs.readFileSync(`${os.tmpdir()}/shiver-main.js`, "utf8");

for (const needle of ["apiUri", "oauth:", "resource:o.a.oauth", "finInfoUrl", "apiName"]) {
  let i = 0;
  let c = 0;
  while ((i = s.indexOf(needle, i)) !== -1 && c < 4) {
    console.log("\n---", needle, "---");
    console.log(s.slice(Math.max(0, i - 60), i + 220).replace(/\s+/g, " "));
    i += needle.length;
    c += 1;
  }
}
