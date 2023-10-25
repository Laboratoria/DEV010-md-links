const mdLinksInstance = require("./lib/app");
const readFileInstance = require("./lib/readfile");
const { getFilesInDirectory } = require("./lib/readDirectory");
const fsInstance = require("fs");

function mdLinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    // Comprueba si filePath no es una cadena
    if (typeof filePath !== "string" || filePath === "") {
      reject(new Error("Debe entregar una ruta de archivo válida"));
    }

    // la exclamacion al inicio pregunta si es falso
    if (!fsInstance.existsSync(filePath)) {
      reject(new Error("La ruta indicada no existe"));
    }

    // Obtiene la ruta absoluta del archivo utilizando la función "getAbsolutePath" de "mdLinksInstance"
    const absolutePath = mdLinksInstance.getAbsolutePath(filePath);

    if (fsInstance.lstatSync(absolutePath).isDirectory()) {
      // es cuando filepath es un directorio
      const filesMD = getFilesInDirectory(absolutePath);
      resolve(filesMD);
    } else {
      // esto es cuando filePath es un archivo
      if (!mdLinksInstance.isMarkdownFile(absolutePath)) {
        // Comprueba si el archivo es de tipo Markdown utilizando la función "isMarkdownFile" de "mdLinksInstance"
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
    }
  });
}

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

mdLinks("./example/")
  .then((response) => {
    console.table(response);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  mdLinks,
};
