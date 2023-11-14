// Importa los módulos necesarios de Node.js
const path = require("path");
const fs = require("fs");
// Importa módulos personalizados desde otros archivos
const isMdwnExtension = require("./verifyExtension");
const readMkdwnFile = require("./readFile");
const extractMarkdownLinks = require("./extractfile");
const validateLinks = require("./validatelinks");

// Se define una función llamada mdLinks que verifica y lee archivos Markdown
const mdLinks = (route, validate = false) => {
  return new Promise((resolve, reject) => {
    try {
      const absolute = path.resolve(route);
      const pathExist = fs.existsSync(absolute);
      if (pathExist) {
        if (isMdwnExtension(absolute)) {
          readMkdwnFile(absolute).then((result) => {
            if (validate) {
              const linksArray = extractMarkdownLinks(result, absolute);
              const resultValidate = validateLinks(linksArray);
              Promise.all(resultValidate)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              resolve(extractMarkdownLinks(result, absolute));
            }
          });
        } else {
          reject(new Error("Is not a Markdown file"));
        }
      } else {
        reject(new Error("Path does not exist"));
      }
    } catch (e) {
      reject(e); // Rechaza la promesa con el objeto de excepción
    }
  });
};

// Exporta la función mdLinks para su uso en otros módulos
module.exports = { mdLinks };
