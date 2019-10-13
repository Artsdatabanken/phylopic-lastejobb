const { io, http } = require("lastejobb");
const path = require("path");
const fs = require("fs");

const metadata = io.lesDatafil("20_bilde").items;

const baseUrl = "http://phylopic.org";
const rootPath = "image";
io.mkdir(rootPath);
downloadNext();

function downloadNext() {
  const e = metadata.pop();
  if (!e) return;
  const url = baseUrl + e.url;
  const localPath = path.join(rootPath, e.local);
  const localFullPath = "./data/" + localPath;
  if (fs.existsSync(localFullPath)) return;
  http.downloadBinary(url, localPath).then(x => {
    downloadNext();
  });
}
