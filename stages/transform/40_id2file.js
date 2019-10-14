const { io, log } = require("lastejobb");

const bilde = io.lesDatafil("20_bilde").items;
const id2bilde = {};
bilde.forEach(b => {
  b.uid.forEach(uid => (id2bilde[uid] = b.local));
});
const takson2id = io.lesDatafil("10_takson");
const takson2kode = lesTakson2kode();

const kode2bilde = [];

Object.keys(takson2id).forEach(name => {
  const id = takson2id[name];
  const kode = phyli2SciName(name);
  if (!kode) return;
  const bildefil = id2bilde[id];
  if (!bildefil) throw new Error("Mangler bilde for " + id);
  kode2bilde.push({ kode, bildefil });
});

function phyli2SciName(phyliName) {
  let name = phyliName;
  while (name.length > 0) {
    if (takson2kode[name]) return takson2kode[name];
    const parts = name.split(" ");
    parts.pop();
    name = parts.join(" ");
  }
  log.warn("No hit for " + phyliName);
}

function lesTakson2kode() {
  const r = {};
  const takson = io.lesDatafil("art-takson/type").items;

  takson.forEach(t => {
    r[t.tittel.sn] = t.kode;
  });
  return r;
}

io.skrivDatafil(__filename, kode2bilde);
