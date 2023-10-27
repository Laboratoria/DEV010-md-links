const { error } = require("console");
const fs = require("fs");

const readMkdwnFile = (markdownFile) => {
  fs.readFile(markdownFile, "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
      throw error;
    } else {
      console.log(data);
      return data;
    }
  });
};
module.exports = readMkdwnFile;
