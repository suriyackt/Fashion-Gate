const https = require("https");
const fs = require("fs");

const url = "https://commons.wikimedia.org/wiki/Special:FilePath/Calvin_Klein_logo.svg";
const options = {
  headers: {
    "User-Agent": "FashionGateAssetUploader/1.0 (contact@fashiongate.sy)"
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, options, (res2) => {
      let data = "";
      res2.on("data", chunk => data += chunk);
      res2.on("end", () => {
        console.log("SVG Content (First 500 chars):");
        console.log(data.substring(0, 500));
      });
    });
  }
});
