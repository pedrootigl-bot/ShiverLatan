"use strict";

const fs = require("node:fs");
const os = require("node:os");

const s = fs.readFileSync(`${os.tmpdir()}/shiver-main.js`, "utf8");
const idx = s.indexOf('login:function(e){var t=r.a.apiUri');
console.log(s.slice(idx, idx + 800));
