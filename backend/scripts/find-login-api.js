"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const file = path.join(os.tmpdir(), "shiver-main.js");
const s = fs.readFileSync(file, "utf8");

for (const needle of ['"/api/login', "'/api/login", "login_form", "web-page_login"]) {
  let i = 0;
  let c = 0;
  while ((i = s.indexOf(needle, i)) !== -1 && c < 8) {
    console.log("\n---", needle, "@", i);
    console.log(s.slice(Math.max(0, i - 100), i + 180).replace(/\s+/g, " "));
    i += needle.length;
    c += 1;
  }
}
