// Importa los módulos necesarios de Node.js
const fs = require("fs");

// Define una función llamada readMkdwnFile que lee un archivo Markdown
const readMkdwnFile = (markdownFile) => {
  // console.log(markdownFile);
  return new Promise((resolve, reject) => {
    fs.readFile(markdownFile, "utf-8", (err, data) => {
      if (err) {
        // console.log("error: ", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Exporta la función readMkdwnFile para su uso en otros módulos
module.exports = readMkdwnFile;
