const { io } = require("lastejobb");

const metadata = io.lesDatafil("metadata").result;

const takson = {};
metadata.forEach(e => {
  e.taxa.forEach(tax => {
    if (!tax.canonicalName) return;
    takson[tax.canonicalName.string] = e.uid;
  });
});

io.skrivDatafil(__filename, takson);
