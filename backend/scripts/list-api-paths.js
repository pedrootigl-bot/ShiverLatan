"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const file = path.join(os.tmpdir(), "shiver-main.js");
const s = fs.readFileSync(file, "utf8");

const matches = new Set();
const re = /\/api\/[a-z0-9\-_/]+/gi;
let m;
while ((m = re.exec(s)) !== null) {
  matches.add(m[0].toLowerCase());
}

console.log([...matches].sort().join("\n"));
