const { io } = require("lastejobb");
const path = require("path");
const fs = require("fs");

const id2file = io.lesDatafil("40_id2file").items;

id2file.forEach(e => {
  const ext = path.extname(e.bildefil);
  const src = "data/image/" + e.bildefil;
  const dest = "build/" + e.kode + ext;
  fs.copyFileSync(src, dest);
});
