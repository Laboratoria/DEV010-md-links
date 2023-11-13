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
    try {
      const absolute = path.resolve(route);
      const pathExist = fs.existsSync(absolute);
      if (pathExist) {
        if (isMdwnExtension(absolute)) {
          readMkdwnFile(absolute).then((result) => {
            // const content = result.toString();
            if (validate) {
              const linksArray = extractMarkdownLinks(result, absolute);
              const resultValidate = validateLinks(linksArray);
              // console.log(resultValidate);
              // resolve(Promise.all(resultValidate));
              // const res = Promise.all(resultValidate)
              Promise.all(resultValidate)
                .then((response) => {
                  console.log(response);
                  // return response;
                })
                .catch((error) => {
                  console.log(error);
                });
              //return res;
            } else {
              resolve(extractMarkdownLinks(result, absolute));
            }
            // resolve(extractMarkdownLinks(result, absolute));
          });
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

/* if (validate) {
  const linksArray = extractMarkdownLinks(result, absolute);
  const resultValidate = validateLinks(linksArray);
  resolve(Promise.all(resultValidate));
} else {
  resolve(extractMarkdownLinks(result, absolute));
}
 */

// He revisado tu código y parece que estás utilizando promesas y funciones asíncronas correctamente. Sin embargo, hay un problema en tu archivo mdlinks.js. En la línea donde llamas a validateLinks(linksArray), estás creando una nueva promesa pero no la estás devolviendo ni resolviendo. Esto podría causar problemas ya que la función mdLinks se resolverá antes de que se complete la validación de los enlaces.
