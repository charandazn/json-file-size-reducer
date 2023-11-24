//import compressedPayload from "./compressedPayload";
const compressedPayload = require("./compressedPayload.js")
const zlib = require('zlib')
const fs = require('fs')

const decompressedBuffer = Buffer.from(
    compressedPayload.compressedPayload,
    'base64'
  );
  const decompressedData = zlib.inflateSync(decompressedBuffer).toString();
  const retrivedPayload = JSON.parse(decompressedData);
  fs.writeFileSync("dummy.json", JSON.stringify(retrivedPayload))
  const size = fs.statSync('dummy.json').size/1024
  console.log(size , 'kb')
  //console.log(retrivedPayload)
  //fs.writeFileSync('check.json' , retrivedPayload)