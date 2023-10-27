const path = require("path");
const mdwnExtension = [
  ".md",
  ".mkd",
  ".mdwn",
  ".mdown",
  ".mdtxt",
  ".mdtext",
  ".markdown",
  ".text",
];

const isMdwnExtension = (filePath) => {
  const fileExtension = path.extname(filePath);
  return mdwnExtension.includes(fileExtension);
};
module.exports = isMdwnExtension;
