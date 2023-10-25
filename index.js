const mdLinksInstance = require("./lib/app");
const readFileInstance = require("./lib/readfile");

function mdLinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    // Comprueba si filePath no es una cadena
    if (typeof filePath !== "string") {
      reject(new Error("Debe entregar una ruta de archivo válida"));
    }
    // Obtiene la ruta absoluta del archivo utilizando la función "getAbsolutePath" de "mdLinksInstance"
    const absolutePath = mdLinksInstance.getAbsolutePath(filePath);

    // Comprueba si la ruta absoluta es nula (indicando un archivo inválido)
    if (absolutePath === null) {
      reject(new Error("Debe entregar un archivo válido"));
    }
    // Comprueba si el archivo es de tipo Markdown utilizando la función "isMarkdownFile" de "mdLinksInstance"
    if (!mdLinksInstance.isMarkdownFile(absolutePath)) {
      reject(new Error("El archivo no es de tipo Markdown"));
    }
    // Llama a "findLinksInMarkdownFile" para buscar enlaces en el archivo y valida si es necesario
    readFileInstance
      .findLinksInMarkdownFile(absolutePath, validate)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
// Ejemplos de uso de mdLinks con diferentes archivos y opciones de validación
mdLinks("./example/probando3.md", true)
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

mdLinks("./example/probando3.md")
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

mdLinks("./example/probando.js")
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = {
  mdLinks,
};
