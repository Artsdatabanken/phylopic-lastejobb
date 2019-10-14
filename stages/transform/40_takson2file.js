const { io } = require("lastejobb");

const bilde = io.lesDatafil("20_bilde").items;
const id2bilde = {};
bilde.forEach(b => {
  b.uid.forEach(uid => (id2bilde[uid] = b.local));
});
const takson2id = io.lesDatafil("35_takson2id");

const kode2bilde = [];

Object.keys(takson2id).forEach(kode => {
  const id = takson2id[kode];
  const bildefil = id2bilde[id];
  if (!bildefil) throw new Error("Mangler bilde for " + id);
  kode2bilde.push({ kode, bildefil });
});

io.skrivDatafil(__filename, kode2bilde);
