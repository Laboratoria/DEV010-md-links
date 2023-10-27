const path = require("path");
const fs = require("fs");
const isMdwnExtension = require("./verifyExtension");
const readMkdwnFile = require("./readFile");

// Se crea la funci'on mdlinks que nos dar'a una
const mdLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const isAbsolute = path.resolve(filePath);
      const pathExist = fs.existsSync(isAbsolute);
      if (pathExist) {
        if (isMdwnExtension(isAbsolute)) {
          const fileContent = readMkdwnFile(isAbsolute);
          resolve(fileContent);
        } else {
          reject(new Error("Is not a Markdown file"));
        }
      } else {
        reject(new Error("Path does not exist"));
      }
      //throw "myException"; // genera una excepción
    } catch (e) {
      // sentencias para manejar cualquier excepción
      reject(e); // pasa el objeto de la excepción al manejador de errores
    }
  });
};

module.exports = { mdLinks };
