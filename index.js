const mdLinksInstance = require("./lib/app");
const readFileInstance = require("./lib/readfile");
// const chalk = require("chalk");

/* validar la ruta del archivo, asegurándose de que sea una cadena, obteniendo la ruta absoluta y
verificando si es un archivo Markdown. Luego, llama a findLinksInMarkdownFile del módulo readfile
para buscar enlaces en el archivo.Finalmente, se manejan las promesas con los bloques
then, catch, y finally, y se exporta la función mdLinks.*/

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    if (typeof filePath !== "string") {
      reject(new Error("Debe entregar una ruta de archivo válida"));
    }

    const absolutePath = mdLinksInstance.getAbsolutePath(filePath);

    if (absolutePath === null) {
      reject(new Error("Debe entregar un archivo válido"));
    }
    if (!mdLinksInstance.isMarkdownFile(absolutePath)) {
      reject(new Error("El archivo no es de tipo Markdown"));
    }

    readFileInstance
      .findLinksInMarkdownFile(absolutePath)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

mdLinks()
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("El proceso ha finalizado");
  });

module.exports = {
  mdLinks,
};
