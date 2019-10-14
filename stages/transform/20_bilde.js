const { io } = require("lastejobb");
const path = require("path");

const metadata = io.lesDatafil("metadata").result;

const bilder = [];
metadata.forEach(e => {
  const beste = finnBesteBilde(e);
  bilder.push({
    uid: [e.uid],
    url: beste.url,
    local: e.uid + path.extname(beste.url),
    licenseURL: e.licenseURL,
    credit: e.credit
  });
});

function finnBesteBilde(e) {
  if (e.svgFile) return e.svgFile;
  const pngs = e.pngFiles.sort((a, b) => (a.height < b.height ? 1 : -1));
  return pngs[0];
}

io.skrivDatafil(__filename, bilder);
