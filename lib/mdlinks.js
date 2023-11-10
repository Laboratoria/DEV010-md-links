// Importa los módulos necesarios de Node.js
const path = require("path");
const fs = require("fs");
// Importa módulos personalizados desde otros archivos
const isMdwnExtension = require("./verifyExtension");
const readMkdwnFile = require("./readFile");
const extractMarkdownLinks = require("./extractfile");
const validateLinks = require("./validatelinks");

// Se define una función llamada mdLinks que verifica y lee archivos Markdown
//const mdLinks = (filePath) => {
const mdLinks = (route, validate = false) => {
  return new Promise((resolve, reject) => {
    //try {
    const absolute = path.resolve(route);
    const pathExist = fs.existsSync(absolute);
    if (!pathExist) {
      reject(new Error("Path does not exist"));
    }

    if (!isMdwnExtension(absolute)) {
      reject(new Error("Is not a Markdown file"));
    }
    readMkdwnFile(absolute)
      .then((result) => {
        console.log("Markdown file content:", result);
        if (validate) {
          const linksArray = extractMarkdownLinks(result, absolute);
          console.log("Extracted links:", linksArray);
          return validateLinks(linksArray);
        } else {
          resolve(extractMarkdownLinks(result, absolute));
        }
      })

      /* if (pathExist) {
        if (isMdwnExtension(absolute)) {
          readMkdwnFile(absolute).then((result) => {
            // const content = result.toString();
            if (validate) {
              const linksArray = extractMarkdownLinks(result, absolute);
              return validateLinks(linksArray);
            } else {
              resolve(extractMarkdownLinks(result, absolute));
            }
            // resolve(extractMarkdownLinks(result, absolute));
          }); */
      /* .then((links) => {
              console.log(links);
              resolve(links);
            });
          const fileContent = readMkdwnFile(absolutebsolute)
            .then((result) => {
              console.log("" + result);
              resolve(result);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            }); */
      /* } else {
          reject(new Error("Is not a Markdown file"));
        }
      } else {
        reject(new Error("Path does not exist"));
      } */
      .catch((e) => reject(e));
    /* } catch (e) {
      reject(e); // Rechaza la promesa con el objeto de excepción
    } */
  });
};

// Exporta la función mdLinks para su uso en otros módulos
module.exports = { mdLinks };
