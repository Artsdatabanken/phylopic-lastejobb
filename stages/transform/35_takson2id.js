const { io, log } = require("lastejobb");

const phtaxon2id = lesPhyloTakson2id();
const takson2kode = lesTakson2kode();

const r = {};

phtaxon2id.forEach(e => {
  const name = e.name;
  const kode = phyli2SciName(name);
  if (!kode) return;
  if (r[kode]) return;
  r[kode] = e.uid;
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

function lesPhyloTakson2id() {
  const takson2id = io.lesDatafil("10_takson");
  const r = [];
  Object.keys(takson2id).forEach(name => {
    r.push({ name, uid: takson2id[name] });
  });
  r.sort((a, b) => (a.name.length < b.name.length ? -1 : 1));
  return r;
}

function lesTakson2kode() {
  const r = {};
  const takson = io.lesDatafil("art-takson/type").items;

  takson.forEach(t => {
    r[t.tittel.sn] = t.kode;
  });
  return r;
}

io.skrivDatafil(__filename, r);
