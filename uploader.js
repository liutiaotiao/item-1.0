const path = require("path");
const OSSUploader = require("tuji-oss-uploader");
const uploader = new OSSUploader();
const glob = require("glob");

const list = glob.sync("dist/**/*.{js,css,html,png,ico,jpg,gif,ttf,woff}", {
  ignore: "build/index.html"
});

const uploadList = list.map(file => {
  return {
    key: file.replace(/^dist\/static\/v3\/m\//, ""),
    path: path.resolve(file)
  };
});

uploader.upload(uploadList).then(function() {
  console.log("All completed ");
});
